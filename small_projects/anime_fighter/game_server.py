from flask import Flask, send_from_directory, request, jsonify
from flask_socketio import SocketIO, emit
import json
import random
import math
import os
import time
import logging
from werkzeug.middleware.proxy_fix import ProxyFix

# Set up logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

app = Flask(__name__)
app.wsgi_app = ProxyFix(app.wsgi_app)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'your-secret-key-here')
socketio = SocketIO(app, cors_allowed_origins="*", async_mode='eventlet')

# Character data
CHARACTERS = {
    "naruto": {
        "name": "Naruto Uzumaki",
        "health": 100,
        "attacks": {
            "rasengan": {"damage": 30, "cooldown": 3},
            "shadow_clone": {"damage": 15, "cooldown": 2},
            "sage_mode": {"damage": 40, "cooldown": 5}
        },
        "special": "nine_tails_mode"
    },
    "goku": {
        "name": "Goku",
        "health": 120,
        "attacks": {
            "kamehameha": {"damage": 35, "cooldown": 4},
            "instant_transmission": {"damage": 25, "cooldown": 2},
            "super_saiyan": {"damage": 45, "cooldown": 6}
        },
        "special": "ultra_instinct"
    },
    "luffy": {
        "name": "Monkey D. Luffy",
        "health": 110,
        "attacks": {
            "gum_gum_pistol": {"damage": 25, "cooldown": 2},
            "gear_second": {"damage": 30, "cooldown": 3},
            "gear_fourth": {"damage": 40, "cooldown": 5}
        },
        "special": "gear_fifth"
    }
}

class GameState:
    def __init__(self):
        self.players = {}
        self.matches = {}
        self.character_data = CHARACTERS
        self.player_cooldowns = {}

    def create_match(self, player1_id, player1_char, player2_id, player2_char):
        match_id = f"match_{len(self.matches)}"
        self.matches[match_id] = {
            "players": {
                player1_id: {
                    "character": player1_char,
                    "health": self.character_data[player1_char]["health"],
                    "position": {"x": -5, "y": 0},
                    "facing": "right",
                    "last_action_time": time.time()
                },
                player2_id: {
                    "character": player2_char,
                    "health": self.character_data[player2_char]["health"],
                    "position": {"x": 5, "y": 0},
                    "facing": "left",
                    "last_action_time": time.time()
                }
            },
            "state": "active",
            "created_at": time.time()
        }
        return match_id

    def update_match(self, match_id, player_id, action):
        if match_id not in self.matches:
            return None
        
        match = self.matches[match_id]
        player_data = match["players"][player_id]
        current_time = time.time()
        
        # Rate limiting
        if current_time - player_data["last_action_time"] < 0.1:  # 100ms cooldown
            return match
            
        player_data["last_action_time"] = current_time
        
        if action["type"] == "move":
            player_data["position"]["x"] += action["dx"]
            player_data["facing"] = "right" if action["dx"] > 0 else "left"
        elif action["type"] == "attack":
            target_id = [pid for pid in match["players"] if pid != player_id][0]
            target_data = match["players"][target_id]
            
            # Check if attack is on cooldown
            attack_key = f"{player_id}_{action['attack']}"
            if attack_key in self.player_cooldowns:
                cooldown_time = self.player_cooldowns[attack_key]
                if current_time < cooldown_time:
                    return match
            
            attack_data = self.character_data[player_data["character"]]["attacks"][action["attack"]]
            
            # Calculate damage
            damage = attack_data["damage"]
            target_data["health"] -= damage
            
            # Set cooldown
            self.player_cooldowns[attack_key] = current_time + attack_data["cooldown"]
            
            if target_data["health"] <= 0:
                match["state"] = "finished"
                match["winner"] = player_id
        
        return match

game_state = GameState()

@app.route('/')
def index():
    try:
        return send_from_directory('.', 'index.html')
    except Exception as e:
        logger.error(f"Error serving index.html: {str(e)}")
        return jsonify({'error': 'Failed to serve index.html'}), 500

@app.route('/<path:path>')
def serve_static(path):
    try:
        return send_from_directory('.', path)
    except Exception as e:
        logger.error(f"Error serving static file {path}: {str(e)}")
        return jsonify({'error': 'File not found'}), 404

@app.errorhandler(404)
def not_found_error(error):
    return jsonify({'error': 'Not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

@socketio.on('connect')
def handle_connect():
    try:
        player_id = request.sid
        logger.info(f"Player connected: {player_id}")
        emit('connected', {'player_id': player_id})
    except Exception as e:
        logger.error(f"Error in connect handler: {str(e)}")
        emit('error', {'message': 'Connection error'})

@socketio.on('select_character')
def handle_character_select(data):
    try:
        player_id = request.sid
        character = data.get('character')
        
        if not character or character not in game_state.character_data:
            emit('error', {'message': 'Invalid character'})
            return
        
        game_state.players[player_id] = {'character': character}
        logger.info(f"Player {player_id} selected character: {character}")
        emit('character_selected', {'character': character})
    except Exception as e:
        logger.error(f"Error in character selection: {str(e)}")
        emit('error', {'message': 'Server error'})

@socketio.on('find_match')
def handle_find_match():
    try:
        player_id = request.sid
        
        if player_id not in game_state.players:
            emit('error', {'message': 'Select a character first'})
            return
        
        # Find another player waiting for a match
        waiting_players = [pid for pid, data in game_state.players.items() 
                          if 'match_id' not in data and pid != player_id]
        
        if waiting_players:
            opponent_id = waiting_players[0]
            match_id = game_state.create_match(
                player_id,
                game_state.players[player_id]['character'],
                opponent_id,
                game_state.players[opponent_id]['character']
            )
            
            game_state.players[player_id]['match_id'] = match_id
            game_state.players[opponent_id]['match_id'] = match_id
            
            logger.info(f"Match created: {match_id} between {player_id} and {opponent_id}")
            emit('match_found', {'match_id': match_id}, room=player_id)
            emit('match_found', {'match_id': match_id}, room=opponent_id)
        else:
            game_state.players[player_id]['waiting'] = True
            logger.info(f"Player {player_id} waiting for opponent")
            emit('waiting_for_opponent')
    except Exception as e:
        logger.error(f"Error in match finding: {str(e)}")
        emit('error', {'message': 'Server error'})

@socketio.on('game_action')
def handle_game_action(data):
    try:
        player_id = request.sid
        match_id = data.get('match_id')
        action = data.get('action')
        
        if not match_id or not action or player_id not in game_state.players or 'match_id' not in game_state.players[player_id]:
            emit('error', {'message': 'Invalid game action'})
            return
        
        match = game_state.update_match(match_id, player_id, action)
        if match:
            emit('game_state', match, room=match_id)
    except Exception as e:
        logger.error(f"Error in game action: {str(e)}")
        emit('error', {'message': 'Server error'})

@socketio.on('disconnect')
def handle_disconnect():
    try:
        player_id = request.sid
        if player_id in game_state.players:
            if 'match_id' in game_state.players[player_id]:
                match_id = game_state.players[player_id]['match_id']
                if match_id in game_state.matches:
                    logger.info(f"Player {player_id} disconnected from match {match_id}")
                    emit('player_disconnected', {'player_id': player_id}, room=match_id)
            del game_state.players[player_id]
    except Exception as e:
        logger.error(f"Error in disconnect handling: {str(e)}")

def find_available_port(start_port=5000, max_port=5010):
    """Find an available port in the given range."""
    import socket
    for port in range(start_port, max_port + 1):
        try:
            with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
                s.bind(('', port))
                return port
        except OSError:
            continue
    raise RuntimeError(f"No available ports found between {start_port} and {max_port}")

if __name__ == '__main__':
    try:
        # Development server
        port = int(os.environ.get('PORT', 5000))
        try:
            port = find_available_port(port, port + 10)
            logger.info(f"Starting server on port {port}")
            socketio.run(app, debug=True, port=port, host='0.0.0.0')
        except Exception as e:
            logger.error(f"Failed to start server: {str(e)}")
            raise
    except Exception as e:
        logger.error(f"Fatal error: {str(e)}")
        raise
else:
    # Production server
    import eventlet
    eventlet.monkey_patch() 