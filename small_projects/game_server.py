from flask import Flask, send_from_directory, request
from flask_socketio import SocketIO, emit
import random
import json
import math
import time

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

# Game state
class GameState:
    def __init__(self):
        self.players = {}
        self.obstacles = []
        self.collectibles = []
        self.powerups = []
        self.game_start_time = None
        self.generate_level()

    def generate_level(self):
        # Generate random obstacles
        self.obstacles = []
        for _ in range(20):
            x = random.uniform(-50, 50)
            z = random.uniform(-50, 50)
            size = random.uniform(1, 3)
            self.obstacles.append({
                'position': {'x': x, 'y': 0, 'z': z},
                'size': size,
                'type': 'obstacle'
            })

        # Generate collectibles
        self.collectibles = []
        for _ in range(10):
            x = random.uniform(-50, 50)
            z = random.uniform(-50, 50)
            self.collectibles.append({
                'position': {'x': x, 'y': 1, 'z': z},
                'type': 'collectible',
                'value': random.randint(5, 15)
            })

        # Generate powerups
        self.powerups = []
        powerup_types = ['speed', 'shield', 'double_points']
        for _ in range(3):
            x = random.uniform(-50, 50)
            z = random.uniform(-50, 50)
            self.powerups.append({
                'position': {'x': x, 'y': 1, 'z': z},
                'type': random.choice(powerup_types),
                'duration': 10
            })

    def start_game(self):
        self.game_start_time = time.time()
        self.generate_level()

game_state = GameState()

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('.', path)

@socketio.on('connect')
def handle_connect():
    player_id = request.sid
    game_state.players[player_id] = {
        'position': {'x': 0, 'y': 0, 'z': 0},
        'rotation': {'y': 0},
        'score': 0,
        'powerups': [],
        'speed': 1.0,
        'shield': False
    }
    emit('game_state', {
        'players': game_state.players,
        'obstacles': game_state.obstacles,
        'collectibles': game_state.collectibles,
        'powerups': game_state.powerups
    })

@socketio.on('disconnect')
def handle_disconnect():
    player_id = request.sid
    if player_id in game_state.players:
        del game_state.players[player_id]
    emit('player_disconnected', {'player_id': player_id})

@socketio.on('player_update')
def handle_player_update(data):
    player_id = request.sid
    if player_id in game_state.players:
        game_state.players[player_id].update(data)
        emit('game_state', {
            'players': game_state.players,
            'obstacles': game_state.obstacles,
            'collectibles': game_state.collectibles,
            'powerups': game_state.powerups
        }, broadcast=True)

@socketio.on('collect_item')
def handle_collect_item(data):
    player_id = request.sid
    if player_id in game_state.players:
        # Remove collected item
        game_state.collectibles = [item for item in game_state.collectibles 
                                 if item['position'] != data['position']]
        # Update player score
        game_state.players[player_id]['score'] += data.get('value', 10)
        emit('game_state', {
            'players': game_state.players,
            'obstacles': game_state.obstacles,
            'collectibles': game_state.collectibles,
            'powerups': game_state.powerups
        }, broadcast=True)

@socketio.on('collect_powerup')
def handle_collect_powerup(data):
    player_id = request.sid
    if player_id in game_state.players:
        # Remove powerup
        game_state.powerups = [item for item in game_state.powerups 
                              if item['position'] != data['position']]
        
        # Apply powerup effect
        powerup_type = data['type']
        if powerup_type == 'speed':
            game_state.players[player_id]['speed'] = 1.5
            # Reset speed after duration
            socketio.sleep(data['duration'])
            game_state.players[player_id]['speed'] = 1.0
        elif powerup_type == 'shield':
            game_state.players[player_id]['shield'] = True
            # Reset shield after duration
            socketio.sleep(data['duration'])
            game_state.players[player_id]['shield'] = False
        elif powerup_type == 'double_points':
            game_state.players[player_id]['double_points'] = True
            # Reset double points after duration
            socketio.sleep(data['duration'])
            game_state.players[player_id]['double_points'] = False

        emit('game_state', {
            'players': game_state.players,
            'obstacles': game_state.obstacles,
            'collectibles': game_state.collectibles,
            'powerups': game_state.powerups
        }, broadcast=True)

@socketio.on('start_game')
def handle_start_game():
    game_state.start_game()
    emit('game_started', {
        'start_time': game_state.game_start_time
    }, broadcast=True)

if __name__ == '__main__':
    socketio.run(app, debug=True) 