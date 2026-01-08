import turtle
import math
import time
from random import randint

# Constants
WINDOW_WIDTH = 800
WINDOW_HEIGHT = 600
MAZE_SIZE = 10
CELL_SIZE = 40
PLAYER_SPEED = 5
TURN_SPEED = 5

class Maze3D:
    def __init__(self):
        self.screen = turtle.Screen()
        self.screen.setup(WINDOW_WIDTH, WINDOW_HEIGHT)
        self.screen.title("3D Maze Game")
        self.screen.bgcolor("black")
        self.screen.tracer(0)
        
        # Create player
        self.player = turtle.Turtle()
        self.player.hideturtle()
        self.player.penup()
        self.player.color("white")
        
        # Create maze
        self.maze = self.generate_maze()
        self.player_x = 1
        self.player_y = 1
        self.player_angle = 0
        
        # Create walls
        self.walls = []
        self.create_walls()
        
        # Set up controls
        self.screen.onkey(self.turn_left, "Left")
        self.screen.onkey(self.turn_right, "Right")
        self.screen.onkey(self.move_forward, "Up")
        self.screen.onkey(self.move_backward, "Down")
        self.screen.listen()
        
        # Start game loop
        self.game_loop()
    
    def generate_maze(self):
        # Simple maze generation (you can make this more complex)
        maze = [[1 for _ in range(MAZE_SIZE)] for _ in range(MAZE_SIZE)]
        
        # Create a simple path
        for i in range(2, MAZE_SIZE-2):
            maze[2][i] = 0
            maze[i][2] = 0
        
        # Add some random walls
        for _ in range(20):
            x = randint(1, MAZE_SIZE-2)
            y = randint(1, MAZE_SIZE-2)
            maze[y][x] = 1
        
        return maze
    
    def create_walls(self):
        # Create wall objects
        for y in range(MAZE_SIZE):
            for x in range(MAZE_SIZE):
                if self.maze[y][x] == 1:
                    wall = turtle.Turtle()
                    wall.hideturtle()
                    wall.penup()
                    wall.color("blue")
                    wall.goto(x * CELL_SIZE - WINDOW_WIDTH/2, y * CELL_SIZE - WINDOW_HEIGHT/2)
                    self.walls.append(wall)
    
    def draw_3d_view(self):
        # Clear previous view
        self.player.clear()
        
        # Draw walls in 3D perspective
        for wall in self.walls:
            # Calculate distance and angle to wall
            dx = wall.xcor() - self.player_x * CELL_SIZE
            dy = wall.ycor() - self.player_y * CELL_SIZE
            distance = math.sqrt(dx*dx + dy*dy)
            angle = math.degrees(math.atan2(dy, dx)) - self.player_angle
            
            # Only draw walls in front of player
            if abs(angle) < 45:
                # Calculate wall size based on distance
                size = 1000 / (distance + 1)
                
                # Draw wall
                self.player.goto(angle * 10, 0)
                self.player.pendown()
                self.player.goto(angle * 10, size)
                self.player.goto(angle * 10 + size/2, size)
                self.player.goto(angle * 10 + size/2, 0)
                self.player.penup()
    
    def move_forward(self):
        next_x = self.player_x + math.cos(math.radians(self.player_angle)) * PLAYER_SPEED/CELL_SIZE
        next_y = self.player_y + math.sin(math.radians(self.player_angle)) * PLAYER_SPEED/CELL_SIZE
        
        if 0 <= next_x < MAZE_SIZE and 0 <= next_y < MAZE_SIZE and self.maze[int(next_y)][int(next_x)] == 0:
            self.player_x = next_x
            self.player_y = next_y
    
    def move_backward(self):
        next_x = self.player_x - math.cos(math.radians(self.player_angle)) * PLAYER_SPEED/CELL_SIZE
        next_y = self.player_y - math.sin(math.radians(self.player_angle)) * PLAYER_SPEED/CELL_SIZE
        
        if 0 <= next_x < MAZE_SIZE and 0 <= next_y < MAZE_SIZE and self.maze[int(next_y)][int(next_x)] == 0:
            self.player_x = next_x
            self.player_y = next_y
    
    def turn_left(self):
        self.player_angle -= TURN_SPEED
        if self.player_angle < 0:
            self.player_angle += 360
    
    def turn_right(self):
        self.player_angle += TURN_SPEED
        if self.player_angle >= 360:
            self.player_angle -= 360
    
    def game_loop(self):
        while True:
            self.draw_3d_view()
            self.screen.update()
            time.sleep(0.016)  # Approximately 60 FPS

if __name__ == "__main__":
    game = Maze3D() 