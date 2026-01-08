// Initialize Three.js scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// Add lighting
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
directionalLight.castShadow = true;
scene.add(directionalLight);

// Create ground
const groundGeometry = new THREE.PlaneGeometry(100, 100);
const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);

// Player variables
const player = {
    position: new THREE.Vector3(0, 1, 0),
    rotation: new THREE.Euler(0, 0, 0),
    speed: 0.1,
    score: 0
};

// Initialize socket.io
const socket = io();

// Game objects
let obstacles = [];
let collectibles = [];
let powerups = [];

// Handle keyboard input
const keys = {};
document.addEventListener('keydown', (event) => keys[event.key] = true);
document.addEventListener('keyup', (event) => keys[event.key] = false);

// Mouse look controls
let isPointerLocked = false;
renderer.domElement.addEventListener('click', () => {
    if (!isPointerLocked) {
        renderer.domElement.requestPointerLock();
    }
});

document.addEventListener('pointerlockchange', () => {
    isPointerLocked = document.pointerLockElement === renderer.domElement;
});

document.addEventListener('mousemove', (event) => {
    if (isPointerLocked) {
        player.rotation.y -= event.movementX * 0.002;
        camera.rotation.x = Math.max(-Math.PI/2, Math.min(Math.PI/2, 
            camera.rotation.x - event.movementY * 0.002));
    }
});

// Socket events
socket.on('game_state', (state) => {
    updateGameState(state);
});

socket.on('player_disconnected', (data) => {
    // Handle player disconnection
    console.log('Player disconnected:', data.player_id);
});

// Update game state
function updateGameState(state) {
    // Update obstacles
    obstacles.forEach(obj => scene.remove(obj));
    obstacles = state.obstacles.map(data => {
        const geometry = new THREE.BoxGeometry(data.size, data.size, data.size);
        const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
        const obstacle = new THREE.Mesh(geometry, material);
        obstacle.position.set(data.position.x, data.position.y + data.size/2, data.position.z);
        obstacle.castShadow = true;
        scene.add(obstacle);
        return obstacle;
    });

    // Update collectibles
    collectibles.forEach(obj => scene.remove(obj));
    collectibles = state.collectibles.map(data => {
        const geometry = new THREE.SphereGeometry(0.5);
        const material = new THREE.MeshStandardMaterial({ color: 0xffff00 });
        const collectible = new THREE.Mesh(geometry, material);
        collectible.position.set(data.position.x, data.position.y, data.position.z);
        collectible.castShadow = true;
        scene.add(collectible);
        return collectible;
    });

    // Update powerups
    powerups.forEach(obj => scene.remove(obj));
    powerups = state.powerups.map(data => {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshStandardMaterial({ 
            color: data.type === 'speed' ? 0x00ff00 : 
                   data.type === 'shield' ? 0x0000ff : 0xff00ff 
        });
        const powerup = new THREE.Mesh(geometry, material);
        powerup.position.set(data.position.x, data.position.y, data.position.z);
        powerup.castShadow = true;
        scene.add(powerup);
        return powerup;
    });

    // Update score display
    document.getElementById('score').textContent = `Score: ${player.score}`;
}

// Game loop
function animate() {
    requestAnimationFrame(animate);

    // Handle movement
    if (keys['w']) movePlayer('forward');
    if (keys['s']) movePlayer('backward');
    if (keys['a']) movePlayer('left');
    if (keys['d']) movePlayer('right');

    // Update camera position
    camera.position.copy(player.position);
    camera.rotation.y = player.rotation.y;

    // Check collisions
    checkCollisions();

    // Update server
    socket.emit('player_update', {
        position: {
            x: player.position.x,
            y: player.position.y,
            z: player.position.z
        },
        rotation: {
            y: player.rotation.y
        }
    });

    renderer.render(scene, camera);
}

// Movement function
function movePlayer(direction) {
    const speed = player.speed;
    const rotation = player.rotation.y;

    switch(direction) {
        case 'forward':
            player.position.x -= Math.sin(rotation) * speed;
            player.position.z -= Math.cos(rotation) * speed;
            break;
        case 'backward':
            player.position.x += Math.sin(rotation) * speed;
            player.position.z += Math.cos(rotation) * speed;
            break;
        case 'left':
            player.position.x -= Math.cos(rotation) * speed;
            player.position.z += Math.sin(rotation) * speed;
            break;
        case 'right':
            player.position.x += Math.cos(rotation) * speed;
            player.position.z -= Math.sin(rotation) * speed;
            break;
    }
}

// Collision detection
function checkCollisions() {
    // Check collectibles
    collectibles.forEach((collectible, index) => {
        if (player.position.distanceTo(collectible.position) < 1) {
            socket.emit('collect_item', {
                position: {
                    x: collectible.position.x,
                    y: collectible.position.y,
                    z: collectible.position.z
                }
            });
            player.score += 10;
        }
    });

    // Check powerups
    powerups.forEach((powerup, index) => {
        if (player.position.distanceTo(powerup.position) < 1) {
            socket.emit('collect_powerup', {
                position: {
                    x: powerup.position.x,
                    y: powerup.position.y,
                    z: powerup.position.z
                },
                type: powerup.userData.type
            });
        }
    });
}

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start the game loop
animate(); 