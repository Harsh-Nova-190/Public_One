const CELL_SIZE = 40;
const COLUMNS =  30;
const ROWS = 13;
const GAME = {
    width: COLUMNS * CELL_SIZE,
    height: ROWS * CELL_SIZE,
    gameOver: false,
    loop: 0,
}

function gameRestart(){
    GAME.gameOver = false;
    Food.reset();
    Snake.reset();
}