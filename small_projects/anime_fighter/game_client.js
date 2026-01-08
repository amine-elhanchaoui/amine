// Game state
let gameState = {
    playerId: null,
    character: null,
    matchId: null,
    players: {},
    canvas: null,
    ctx: null,
    keys: {},
    cooldowns: {}
};

// Initialize game
function initGame() {
    // Setup canvas
    gameState.canvas = document.getElementById('game-canvas');
    gameState.ctx = gameState.canvas.getContext('2d');
    resizeCanvas();

    // Setup socket connection
    const socket = io();
    gameState.socket = socket;

    // Socket event handlers
    socket.on('connect', () => {
        gameState.playerId = socket.id;
        console.log('Connected to server');
    });

    socket.on('character_selected', (data) => {
        gameState.character = data.character;
        document.getElementById('character-select').style.display = 'none';
        document.getElementById('game-container').style.display = 'block';
        socket.emit('find_match');
    });

    socket.on('waiting_for_opponent', () => {
        document.getElementById('waiting-message').style.display = 'block';
    });

    socket.on('match_found', (data) => {
        gameState.matchId = data.match_id;
        document.getElementById('waiting-message').style.display = 'none';
        startGameLoop();
    });

    socket.on('game_state', (data) => {
        gameState.players = data.players;
        updateHUD();
    });

    socket.on('player_disconnected', (data) => {
        alert('Opponent disconnected!');
        location.reload();
    });

    // Character selection
    document.querySelectorAll('.character-card').forEach(card => {
        card.addEventListener('click', () => {
            const character = card.dataset.character;
            socket.emit('select_character', { character });
        });
    });

    // Input handling
    window.addEventListener('keydown', (e) => {
        gameState.keys[e.key.toLowerCase()] = true;
        handleInput(e.key.toLowerCase());
    });

    window.addEventListener('keyup', (e) => {
        gameState.keys[e.key.toLowerCase()] = false;
    });

    window.addEventListener('resize', resizeCanvas);
}

// Handle input
function handleInput(key) {
    if (!gameState.matchId) return;

    const actions = {
        'a': () => sendAction({ type: 'move', dx: -0.1 }),
        'd': () => sendAction({ type: 'move', dx: 0.1 }),
        'j': () => sendAction({ type: 'attack', attack: 'light' }),
        'k': () => sendAction({ type: 'attack', attack: 'heavy' }),
        'l': () => sendAction({ type: 'attack', attack: 'special' })
    };

    if (actions[key] && !gameState.cooldowns[key]) {
        actions[key]();
        if (key === 'j' || key === 'k' || key === 'l') {
            gameState.cooldowns[key] = true;
            setTimeout(() => {
                gameState.cooldowns[key] = false;
            }, 1000);
        }
    }
}

// Send action to server
function sendAction(action) {
    gameState.socket.emit('game_action', {
        match_id: gameState.matchId,
        action: action
    });
}

// Update HUD
function updateHUD() {
    const player1 = Object.values(gameState.players)[0];
    const player2 = Object.values(gameState.players)[1];

    document.getElementById('player1-health').style.width = 
        `${(player1.health / 100) * 100}%`;
    document.getElementById('player2-health').style.width = 
        `${(player2.health / 100) * 100}%`;
}

// Game loop
function startGameLoop() {
    function loop() {
        if (gameState.matchId) {
            render();
            requestAnimationFrame(loop);
        }
    }
    loop();
}

// Render game
function render() {
    const ctx = gameState.ctx;
    ctx.clearRect(0, 0, gameState.canvas.width, gameState.canvas.height);

    // Draw background
    ctx.fillStyle = '#2a2a2a';
    ctx.fillRect(0, 0, gameState.canvas.width, gameState.canvas.height);

    // Draw ground
    ctx.fillStyle = '#3a3a3a';
    ctx.fillRect(0, gameState.canvas.height - 100, gameState.canvas.width, 100);

    // Draw players
    Object.entries(gameState.players).forEach(([id, player]) => {
        const x = (player.position.x + 10) * (gameState.canvas.width / 20);
        const y = gameState.canvas.height - 150;

        // Draw character
        ctx.fillStyle = id === gameState.playerId ? '#00ff00' : '#ff0000';
        ctx.fillRect(x - 25, y - 50, 50, 100);

        // Draw health bar
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(x - 25, y - 70, 50, 10);
        ctx.fillStyle = '#00ff00';
        ctx.fillRect(x - 25, y - 70, (player.health / 100) * 50, 10);
    });
}

// Resize canvas
function resizeCanvas() {
    gameState.canvas.width = window.innerWidth;
    gameState.canvas.height = window.innerHeight;
}

// Start the game
initGame(); 