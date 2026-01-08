@echo off
g++ tictactoe_win32.cpp -o tictactoe.exe -mwindows
if %errorlevel% equ 0 (
    echo Compilation successful!
    echo Running the game...
    tictactoe.exe
) else (
    echo Compilation failed!
    echo Please make sure you have MinGW installed and added to your PATH.
)
pause 