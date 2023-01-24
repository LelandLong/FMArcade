// PacMan
//    v2.0

// - - - VARIABLE DECLARATIONS - - -

// Global vars
var gameGlobals = {
  blinkCounter: 1,
  timerDuration: 70,
  levelIndex: 1,
  levelActive: true,
  scaredTimer: 0,
};

// animation frame pattern for player
const PLAYER_FRAMES_LEFT = [2, 3, 1, 3];
const PLAYER_FRAMES_RIGHT = [4, 5, 1, 5];
const PLAYER_FRAMES_UP = [6, 7, 1, 7];
const PLAYER_FRAMES_DOWN = [8, 9, 1, 9];
const ENEMY_FRAME_LEFT = 10;
const ENEMY_FRAME_RIGHT = 11;
const ENEMY_FRAME_UP = 12;
const ENEMY_FRAME_DOWN = 13;
const WALL_FRAME = 50;
const EMPTY_FRAME = 0;

// screen bitmap
const columns = 66;
const rows = 76;
var screenBitmap = powerArray(rows, columns);
for (let row = 0; row < rows; row++) {
  for (let column = 0; column < columns; column++) {
    screenBitmap[row][column] = EMPTY_FRAME;
  }
}

// initial bitmap with walls(50), pellets(30), energizers(31), and paths(0)
var screenBitmap = [
  [
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50,
  ],
  [
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50,
  ],
  [
    50, 50, 30, 00, 30, 00, 30, 00, 30, 00, 30, 00, 30, 00, 30, 00, 30, 00, 30,
    00, 30, 00, 30, 00, 30, 00, 30, 00, 00, 30, 50, 50, 50, 50, 50, 50, 30, 00,
    00, 30, 00, 30, 00, 30, 00, 30, 00, 30, 00, 30, 00, 30, 00, 30, 00, 30, 00,
    30, 00, 30, 00, 30, 00, 30, 50, 50,
  ],
  [
    50, 50, 00, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50, 50, 50, 00, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 00, 50, 50,
  ],
  [
    50, 50, 30, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 30, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 30, 50, 50, 50, 50, 50, 50, 30, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 30, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 30, 50, 50,
  ],
  [
    50, 50, 00, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50, 50, 50, 00, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 00, 50, 50,
  ],
  [
    50, 50, 31, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 30, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 30, 50, 50, 50, 50, 50, 50, 30, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 30, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 31, 50, 50,
  ],
  [
    50, 50, 00, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50, 50, 50, 00, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 00, 50, 50,
  ],
  [
    50, 50, 30, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 30, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 30, 50, 50, 50, 50, 50, 50, 30, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 30, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 30, 50, 50,
  ],
  [
    50, 50, 00, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50, 50, 50, 00, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 00, 50, 50,
  ],
  [
    50, 50, 30, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 30, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 30, 50, 50, 50, 50, 50, 50, 30, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 30, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 30, 50, 50,
  ],
  [
    50, 50, 00, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50, 50, 50, 00, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 00, 50, 50,
  ],
  [
    50, 50, 30, 00, 30, 00, 30, 00, 30, 00, 30, 00, 30, 00, 30, 00, 30, 00, 30,
    00, 30, 00, 30, 00, 30, 00, 30, 00, 00, 30, 00, 30, 00, 00, 30, 00, 30, 00,
    00, 30, 00, 30, 00, 30, 00, 30, 00, 30, 00, 30, 00, 30, 00, 30, 00, 30, 00,
    30, 00, 30, 00, 30, 00, 30, 50, 50,
  ],
  [
    50, 50, 00, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50,
    50, 50, 50, 00, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 00, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 00, 50, 50,
  ],
  [
    50, 50, 30, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 30, 50, 50, 50, 50,
    50, 50, 50, 30, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 30, 50, 50, 50, 50, 50, 50, 50, 30, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 30, 50, 50,
  ],
  [
    50, 50, 00, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50,
    50, 50, 50, 00, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 00, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 00, 50, 50,
  ],
  [
    50, 50, 30, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 30, 50, 50, 50, 50,
    50, 50, 50, 30, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 30, 50, 50, 50, 50, 50, 50, 50, 30, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 30, 50, 50,
  ],
  [
    50, 50, 00, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50,
    50, 50, 50, 00, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 00, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 00, 50, 50,
  ],
  [
    50, 50, 00, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50,
    50, 50, 50, 00, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 00, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 00, 50, 50,
  ],
  [
    50, 50, 30, 00, 30, 00, 30, 00, 30, 00, 30, 00, 30, 00, 30, 50, 50, 50, 50,
    50, 50, 50, 30, 00, 30, 00, 30, 00, 00, 30, 50, 50, 50, 50, 50, 50, 30, 00,
    00, 30, 00, 30, 00, 30, 50, 50, 50, 50, 50, 50, 50, 30, 00, 30, 00, 30, 00,
    30, 00, 30, 00, 30, 00, 30, 50, 50,
  ],
  [
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50, 50, 50, 00, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50,
  ],
  [
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 30, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50, 50, 50, 00, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 30, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50,
  ],
  [
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50, 50, 50, 00, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50,
  ],
  [
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 30, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50, 50, 50, 00, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 30, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50,
  ],
  [
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50, 50, 50, 00, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50,
  ],
  [
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 30, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50, 50, 50, 00, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 30, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50,
  ],
  [
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50, 50, 50, 00, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50,
  ],
  [
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 30, 50, 50, 50, 50,
    50, 50, 50, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
    00, 00, 00, 00, 00, 00, 50, 50, 50, 50, 50, 50, 50, 30, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50,
  ],
  [
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50,
    50, 50, 50, 00, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 51, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 00, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50,
  ],
  [
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 30, 50, 50, 50, 50,
    50, 50, 50, 00, 50, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
    00, 00, 00, 00, 50, 00, 50, 50, 50, 50, 50, 50, 50, 30, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50,
  ],
  [
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50,
    50, 50, 50, 00, 50, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
    00, 00, 00, 00, 50, 00, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50,
  ],
  [
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 30, 50, 50, 50, 50,
    50, 50, 50, 00, 50, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
    00, 00, 00, 00, 50, 00, 50, 50, 50, 50, 50, 50, 50, 30, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50,
  ],
  [
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50,
    50, 50, 50, 00, 50, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
    00, 00, 00, 00, 50, 00, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50,
  ],
  [
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50,
    50, 50, 50, 00, 50, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
    00, 00, 00, 00, 50, 00, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50,
  ],
  [
    00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 30, 00, 00, 00, 00,
    00, 00, 00, 00, 50, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
    00, 00, 00, 00, 50, 00, 00, 00, 00, 00, 00, 00, 00, 30, 00, 00, 00, 00, 00,
    00, 00, 00, 00, 00, 00, 00, 00, 00,
  ],
  [
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50,
    50, 50, 50, 00, 50, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
    00, 00, 00, 00, 50, 00, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50,
  ],
  [
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 30, 50, 50, 50, 50,
    50, 50, 50, 00, 50, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
    00, 00, 00, 00, 50, 00, 50, 50, 50, 50, 50, 50, 50, 30, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50,
  ],
  [
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50,
    50, 50, 50, 00, 50, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
    00, 00, 00, 00, 50, 00, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50,
  ],
  [
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 30, 50, 50, 50, 50,
    50, 50, 50, 00, 50, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
    00, 00, 00, 00, 50, 00, 50, 50, 50, 50, 50, 50, 50, 30, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50,
  ],
  [
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50,
    50, 50, 50, 00, 50, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
    00, 00, 00, 00, 50, 00, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50,
  ],
  [
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 30, 50, 50, 50, 50,
    50, 50, 50, 00, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 00, 50, 50, 50, 50, 50, 50, 50, 30, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50,
  ],
  [
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50,
    50, 50, 50, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
    00, 00, 00, 00, 00, 00, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50,
  ],
  [
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 30, 50, 50, 50, 50,
    50, 50, 50, 00, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 00, 50, 50, 50, 50, 50, 50, 50, 30, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50,
  ],
  [
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50,
    50, 50, 50, 00, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 00, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50,
  ],
  [
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 30, 50, 50, 50, 50,
    50, 50, 50, 00, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 00, 50, 50, 50, 50, 50, 50, 50, 30, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50,
  ],
  [
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50,
    50, 50, 50, 00, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 00, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50,
  ],
  [
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 30, 50, 50, 50, 50,
    50, 50, 50, 00, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 00, 50, 50, 50, 50, 50, 50, 50, 30, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50,
  ],
  [
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50,
    50, 50, 50, 00, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 00, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50,
  ],
  [
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50,
    50, 50, 50, 00, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 00, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50,
  ],
  [
    50, 50, 30, 00, 30, 00, 30, 00, 30, 00, 30, 00, 30, 00, 30, 00, 30, 00, 30,
    00, 30, 00, 30, 00, 30, 00, 30, 00, 00, 30, 50, 50, 50, 50, 50, 50, 30, 00,
    00, 30, 00, 30, 00, 30, 00, 30, 00, 30, 00, 30, 00, 30, 00, 30, 00, 30, 00,
    30, 00, 30, 00, 30, 00, 30, 50, 50,
  ],
  [
    50, 50, 00, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50, 50, 50, 00, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 00, 50, 50,
  ],
  [
    50, 50, 30, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 30, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 30, 50, 50, 50, 50, 50, 50, 30, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 30, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 30, 50, 50,
  ],
  [
    50, 50, 00, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50, 50, 50, 00, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 00, 50, 50,
  ],
  [
    50, 50, 30, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 30, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 30, 50, 50, 50, 50, 50, 50, 30, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 30, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 30, 50, 50,
  ],
  [
    50, 50, 00, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50, 50, 50, 00, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 00, 50, 50,
  ],
  [
    50, 50, 00, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50, 50, 50, 00, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 00, 50, 50,
  ],
  [
    50, 50, 31, 00, 30, 00, 30, 50, 50, 50, 50, 50, 50, 50, 30, 00, 30, 00, 30,
    00, 30, 00, 30, 00, 30, 00, 30, 00, 00, 30, 00, 30, 00, 00, 30, 00, 30, 00,
    00, 30, 00, 30, 00, 30, 00, 30, 00, 30, 00, 30, 00, 30, 50, 50, 50, 50, 50,
    50, 50, 30, 00, 30, 00, 31, 50, 50,
  ],
  [
    50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50,
    50, 50, 50, 00, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 00, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50, 50,
    50, 50, 00, 50, 50, 50, 50, 50, 50,
  ],
  [
    50, 50, 50, 50, 50, 50, 30, 50, 50, 50, 50, 50, 50, 50, 30, 50, 50, 50, 50,
    50, 50, 50, 30, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 30, 50, 50, 50, 50, 50, 50, 50, 30, 50, 50, 50, 50, 50,
    50, 50, 30, 50, 50, 50, 50, 50, 50,
  ],
  [
    50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50,
    50, 50, 50, 00, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 00, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50, 50,
    50, 50, 00, 50, 50, 50, 50, 50, 50,
  ],
  [
    50, 50, 50, 50, 50, 50, 30, 50, 50, 50, 50, 50, 50, 50, 30, 50, 50, 50, 50,
    50, 50, 50, 30, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 30, 50, 50, 50, 50, 50, 50, 50, 30, 50, 50, 50, 50, 50,
    50, 50, 30, 50, 50, 50, 50, 50, 50,
  ],
  [
    50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50,
    50, 50, 50, 00, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 00, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50, 50,
    50, 50, 00, 50, 50, 50, 50, 50, 50,
  ],
  [
    50, 50, 50, 50, 50, 50, 30, 50, 50, 50, 50, 50, 50, 50, 30, 50, 50, 50, 50,
    50, 50, 50, 30, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 30, 50, 50, 50, 50, 50, 50, 50, 30, 50, 50, 50, 50, 50,
    50, 50, 30, 50, 50, 50, 50, 50, 50,
  ],
  [
    50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50,
    50, 50, 50, 00, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 00, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50, 50,
    50, 50, 00, 50, 50, 50, 50, 50, 50,
  ],
  [
    50, 50, 30, 00, 30, 00, 30, 00, 30, 00, 30, 00, 30, 00, 30, 50, 50, 50, 50,
    50, 50, 50, 30, 00, 30, 00, 30, 00, 00, 30, 50, 50, 50, 50, 50, 50, 30, 00,
    00, 30, 00, 30, 00, 30, 50, 50, 50, 50, 50, 50, 50, 30, 00, 30, 00, 30, 00,
    30, 00, 30, 00, 30, 00, 30, 50, 50,
  ],
  [
    50, 50, 00, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50, 50, 50, 00, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 00, 50, 50,
  ],
  [
    50, 50, 30, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 30, 50, 50, 50, 50, 50, 50, 30, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 30, 50, 50,
  ],
  [
    50, 50, 00, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50, 50, 50, 00, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 00, 50, 50,
  ],
  [
    50, 50, 30, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 30, 50, 50, 50, 50, 50, 50, 30, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 30, 50, 50,
  ],
  [
    50, 50, 00, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50, 50, 50, 00, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 00, 50, 50,
  ],
  [
    50, 50, 00, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 00, 50, 50, 50, 50, 50, 50, 00, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 00, 50, 50,
  ],
  [
    50, 50, 30, 00, 30, 00, 30, 00, 30, 00, 30, 00, 30, 00, 30, 00, 30, 00, 30,
    00, 30, 00, 30, 00, 30, 00, 30, 00, 00, 30, 00, 30, 00, 00, 30, 00, 30, 00,
    00, 30, 00, 30, 00, 30, 00, 30, 00, 30, 00, 30, 00, 30, 00, 30, 00, 30, 00,
    30, 00, 30, 00, 30, 00, 30, 50, 50,
  ],
  [
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50,
  ],
  [
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50,
  ],
  [
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
    50, 50, 50, 50, 50, 50, 50, 50, 50,
  ],
];

var player = {
  positionX: 32,
  positionY: 56,
  previousPositionX: 0,
  previousPositionY: 0,
  frameNo: 0,
  movingFlag: true,
  whichWay: "left",
  lastKey: "left",
};

var enemies = [
  {
    positionX: 4,
    positionY: 2,
    previousPositionX: 0,
    previousPositionY: 0,
    previousMoveBranched: false,
    whichWay: "right",
    scaredFlag: false,
    killedFlag: false,
    deathTimer: 0,
  },
  {
    positionX: 49,
    positionY: 2,
    previousPositionX: 0,
    previousPositionY: 0,
    previousMoveBranched: false,
    whichWay: "left",
    scaredFlag: false,
    killedFlag: false,
    deathTimer: 0,
  },
  {
    positionX: 6,
    positionY: 49,
    previousPositionX: 0,
    previousPositionY: 0,
    previousMoveBranched: false,
    whichWay: "right",
    scaredFlag: false,
    killedFlag: false,
    deathTimer: 0,
  },
  {
    positionX: 47,
    positionY: 49,
    previousPositionX: 0,
    previousPositionY: 0,
    previousMoveBranched: false,
    whichWay: "left",
    scaredFlag: false,
    killedFlag: false,
    deathTimer: 0,
  },
];

// - - - GAME INIT - - -

var gameTimer;

// - - - WEBVIEWER / DOCUMENT - - -

// Global / Document - events
$(document).ready(function () {
  // refresh after delay (delay required to allow time for FileMaker object to be added to webviewer)
  const refreshDelay = setTimeout(() => {
    screenBitmapInitialRefresh();
  }, 50);

  const startDelay = setTimeout(() => {
    gameTimer = setInterval(gameLoop, gameGlobals.timerDuration);
  }, 1000);
});

$(document).keydown(function (e) {
  var keys = new Object();
  keys.whichKey = e.code;
  keys.keyCode = e.keyCode;
  FileMaker.PerformScriptWithOption(
    "Keyboard ( data ) 2",
    JSON.stringify(keys),
    0
  );
  keyRouting(keys.whichKey, keys.keyCode);
});
$(document).keyup(function (e) {
  var keys = new Object();
  keys.whichKey = " ";
  FileMaker.PerformScriptWithOption(
    "Keyboard ( data ) 2",
    JSON.stringify(keys),
    0
  );
});

// - - - USER INPUT - - -

function keyRouting(whichKey, keyCode) {
  switch (whichKey) {
    // Mac - A key
    case "KeyA":
      player.lastKey = "up";
      break;

    // Mac - Z key
    case "KeyZ":
      player.lastKey = "down";
      break;

    // Mac - comma key
    case "Comma":
      player.lastKey = "left";
      break;

    // Mac - period key
    case "Period":
      player.lastKey = "right";
      break;

    // Mac - Q key
    case "KeyQ":
      clearTimeout(gameTimer);
      FileMaker.PerformScriptWithOption("Game_Quit 2", "", 0);
      break;

    default:
      switch (keyCode) {
        // Windows - A key
        case 65:
          player.lastKey = "up";
          break;

        // Windows - Z key
        case 90:
          player.lastKey = "down";
          break;

        // Windows - comma key
        case 188:
          player.lastKey = "left";
          break;

        // Windows - period key
        case 190:
          player.lastKey = "right";
          break;

        // Windows - Q key
        case 81:
          clearTimeout(gameTimer);
          FileMaker.PerformScriptWithOption("Game_Quit 2", "", 0);
          break;

        default:
      }
  }
}

// - - - UTILITY - - -

// ref: https://medium.com/fractions/multidimensional-arrays-in-javascript-be344f27df0e

function powerArray(length) {
  let array = new Array(length ?? 0);
  let i = length;
  // If the parameters are more than one, we iterate over them one by one
  // and using line 2 of this function, we create inner arrays.
  if (arguments.length > 1) {
    let dimensions = Array.prototype.slice.call(arguments, 1);
    // We recall the `powerArray` function for the rest of the parameters / dimensions.
    while (i--) array[length - 1 - i] = powerArray.apply(this, dimensions);
  }
  return array;
}

// - - -

function screenBitmapInitialRefresh() {
  // provide FMP with initial screenBitmap
  FileMaker.PerformScriptWithOption(
    "InitialScreenBitmap ( screenBitmap ) 2",
    JSON.stringify(screenBitmap),
    5
  );

  // refresh each coord that is NOT empty or a wall (this forces FMP to draw pellets)
  const columns = 66;
  const rows = 76;
  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      if (
        screenBitmap[row][column] != WALL_FRAME &&
        screenBitmap[row][column] != EMPTY_FRAME
      ) {
        const params = {
          column: column,
          row: row,
        };
        FileMaker.PerformScriptWithOption(
          "RefreshContainer ( column, row ) 2",
          JSON.stringify(params),
          0
        );
      }
    }
  }
}

// - - -

function screenBitmapUpdate() {
  // remove previous player sprite position from bitmap
  screenBitmap[player.previousPositionY][player.previousPositionX] =
    EMPTY_FRAME;

  // add current player sprite position to bitmap
  switch (player.whichWay) {
    case "left":
      screenBitmap[player.positionY][player.positionX] =
        PLAYER_FRAMES_LEFT[player.frameNo];
      break;

    case "right":
      screenBitmap[player.positionY][player.positionX] =
        PLAYER_FRAMES_RIGHT[player.frameNo];
      break;

    case "up":
      screenBitmap[player.positionY][player.positionX] =
        PLAYER_FRAMES_UP[player.frameNo];
      break;

    case "down":
      screenBitmap[player.positionY][player.positionX] =
        PLAYER_FRAMES_DOWN[player.frameNo];
      break;

    default:
      FileMaker.PerformScriptWithOption(
        "Console ( data ) 2",
        "Error for screenBitmapUpdate PLAYER; default case - whichWay:" +
          player.whichWay,
        0
      );
  }

  for (let index = 0; index < enemies.length; index++) {
    const enemy = enemies[index];

    // remove previous enemy sprite position from bitmap
    screenBitmap[enemy.previousPositionY][enemy.previousPositionX] =
      EMPTY_FRAME;

    // add current enemy sprite position to bitmap
    switch (enemy.whichWay) {
      case "left":
        screenBitmap[enemy.positionY][enemy.positionX] =
          ENEMY_FRAME_LEFT + index * 4;
        break;

      case "right":
        screenBitmap[enemy.positionY][enemy.positionX] =
          ENEMY_FRAME_RIGHT + index * 4;
        break;

      case "up":
        screenBitmap[enemy.positionY][enemy.positionX] =
          ENEMY_FRAME_UP + index * 4;
        break;

      case "down":
        screenBitmap[enemy.positionY][enemy.positionX] =
          ENEMY_FRAME_DOWN + index * 4;
        break;

      default:
        FileMaker.PerformScriptWithOption(
          "Console ( data ) 2",
          "Error for screenBitmapUpdate ENEMY; default case - whichWay:" +
            enemy.whichWay,
          0
        );
    }
  }
  // }
}

// - - - PLAYER - - -

function playerUpdate() {
  // update previousPositions
  player.previousPositionX = player.positionX;
  player.previousPositionY = player.positionY;

  // player wants to change direction
  if (player.whichWay != player.lastKey) {
    playerWantsToMove(player.lastKey);
  }

  if (player.movingFlag) {
    // 4 (0, 1, 2, 3) animations frames while moving
    player.frameNo += 1;
    if (player.frameNo > 3) {
      player.frameNo = 0;
    }

    // directional control - stop if next spot is a wall
    switch (player.whichWay) {
      case "left":
        if (
          screenBitmap[player.positionY][player.positionX - 1] != WALL_FRAME
        ) {
          player.positionX -= 1;
          player.movingFlag = true;
        } else {
          player.movingFlag = false;
        }
        break;

      case "right":
        if (
          screenBitmap[player.positionY][player.positionX + 1] != WALL_FRAME
        ) {
          player.positionX += 1;
          player.movingFlag = true;
        } else {
          player.movingFlag = false;
        }
        break;

      case "up":
        if (
          screenBitmap[player.positionY - 1][player.positionX] != WALL_FRAME
        ) {
          player.positionY -= 1;
          player.movingFlag = true;
        } else {
          player.movingFlag = false;
        }
        break;

      case "down":
        if (
          screenBitmap[player.positionY + 1][player.positionX] != WALL_FRAME
        ) {
          player.positionY += 1;
          player.movingFlag = true;
        } else {
          player.movingFlag = false;
        }
        break;

      default:
        FileMaker.PerformScriptWithOption(
          "Console ( data ) 2",
          "Error for playerMoving; default case - whichWay:" + player.whichWay,
          0
        );
    }

    // wrap-around when crossing either side (tunnel)
    if (player.positionX < 1) {
      player.positionX = 65;
      player.previousPositionX = 1;
    }
    if (player.positionX > 65) {
      player.positionX = 1;
      player.previousPositionX = 65;
    }
  }
}

// - - -

function playerWantsToMove(whichDirection) {
  // directional control
  switch (whichDirection) {
    case "left":
      if (screenBitmap[player.positionY][player.positionX - 1] != WALL_FRAME) {
        // next position in this direction is not a wall
        player.movingFlag = true;
        player.whichWay = whichDirection;
      }
      break;

    case "right":
      if (screenBitmap[player.positionY][player.positionX + 1] != WALL_FRAME) {
        // next position in this direction is not a wall
        player.movingFlag = true;
        player.whichWay = whichDirection;
      }
      break;

    case "up":
      if (screenBitmap[player.positionY - 1][player.positionX] != WALL_FRAME) {
        // next position in this direction is not a wall
        player.movingFlag = true;
        player.whichWay = whichDirection;
      }
      break;

    case "down":
      if (screenBitmap[player.positionY + 1][player.positionX] != WALL_FRAME) {
        // next position in this direction is not a wall
        player.movingFlag = true;
        player.whichWay = whichDirection;
      }
      break;

    default:
      FileMaker.PerformScriptWithOption(
        "Console ( data ) 2",
        "Error for playerMoving; default case - whichWay:" + player.whichWay,
        0
      );
  }
}

// - - - ENEMIES - - -

function enemiesUpdate() {
  for (let index = 0; index < enemies.length; index++) {
    const enemy = enemies[index];
  }
}

// - - - MAIN GAME LOOP - - -

function gameLoop() {
  // level not yet completed
  if (gameGlobals.levelActive == true) {
    // move sprites and update screenBitmap
    playerUpdate();
    enemiesUpdate();
    screenBitmapUpdate();

    // prepare FMP parameter (the only data needed)
    const params = {
      player: {
        positionX: player.positionX,
        positionY: player.positionY,
        previousPositionX: player.previousPositionX,
        previousPositionY: player.previousPositionY,
      },
      enemies: [
        {
          positionX: enemies[0].positionX,
          positionY: enemies[0].positionY,
          previousPositionX: enemies[0].previousPositionX,
          previousPositionY: enemies[0].previousPositionY,
        },
        {
          positionX: enemies[1].positionX,
          positionY: enemies[1].positionY,
          previousPositionX: enemies[1].previousPositionX,
          previousPositionY: enemies[1].previousPositionY,
        },
        {
          positionX: enemies[2].positionX,
          positionY: enemies[2].positionY,
          previousPositionX: enemies[2].previousPositionX,
          previousPositionY: enemies[2].previousPositionY,
        },
        {
          positionX: enemies[3].positionX,
          positionY: enemies[3].positionY,
          previousPositionX: enemies[3].previousPositionX,
          previousPositionY: enemies[3].previousPositionY,
        },
      ],
      screenBitmap: screenBitmap,
    };
    // send to FMP for rendering
    FileMaker.PerformScriptWithOption(
      "Update ( gameData )",
      JSON.stringify(params),
      0
    );
  }
}
