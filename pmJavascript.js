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
  preparingTimer: 0,
};

// animation frame pattern for player
const PLAYER_FRAMES_LEFT = [2, 3, 1, 3];
const PLAYER_FRAMES_RIGHT = [4, 5, 1, 5];
const PLAYER_FRAMES_UP = [6, 7, 1, 7];
const PLAYER_FRAMES_DOWN = [8, 9, 1, 9];
const PLAYER_FRAMES_KILLED = [
  7, 5, 9, 3, 7, 5, 9, 3, 7, 5, 9, 3, 6, 4, 8, 2, 6, 4, 8, 2, 6, 4, 8, 2, 1, 1,
  0,
];
const ENEMY_FRAME_LEFT = 10;
const ENEMY_FRAME_RIGHT = 11;
const ENEMY_FRAME_UP = 12;
const ENEMY_FRAME_DOWN = 13;
const PELLET_FRAME = 30;
const ENERGIZER_FRAME = 31;
const WALL_FRAME = 50;
const EMPTY_FRAME = 0;
const CHERRY_FRAME = 40;
const STRAWBERRY_FRAME = 40;
const PEACH_FRAME = 40;
const APPLE_FRAME = 40;
const GRAPES_FRAME = 40;
const GALAXIAN_FRAME = 40;
const BELL_FRAME = 40;
const KEY_FRAME = 40;

const SCORING_PELLET = 10;
const SCORING_ENERGIZER = 50;
const SCORING_CHERRY = 100;
const SCORING_STRAWBERRY = 300;
const SCORING_PEACH = 500;
const SCORING_APPLE = 700;
const SCORING_GRAPES = 1000;
const SCORING_GALAXIAN = 2000;
const SCORING_BELL = 3000;
const SCORING_KEY = 5000;

const PREPARING_FULLTIMER = 30;
const PREPARING_HALFTIMER = 15;

// screen bitmap; initialize empty array
const columns = 70;
const rows = 80;
var screenBitmap = powerArray(rows, columns);
for (let row = 0; row < rows; row++) {
  for (let column = 0; column < columns; column++) {
    screenBitmap[row][column] = EMPTY_FRAME;
  }
}

// initial bitmap with walls(50), pellets(30 x280), energizers(31 x4), and paths(0)
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
  moving: false,
  whichWay: "left",
  lastKey: "left",
  score: 0,
  dying: false,
};

var enemies = [
  {
    positionX: 0,
    positionY: 0,
    previousPositionX: 0,
    previousPositionY: 0,
    previousMoveBranched: false,
    whichWay: "left",
    preparing: true,
    atHome: false,
    scared: false,
    killed: false,
    deathTimer: 0,
  },
  {
    positionX: 0,
    positionY: 0,
    previousPositionX: 0,
    previousPositionY: 0,
    previousMoveBranched: false,
    whichWay: "up",
    preparing: true,
    atHome: false,
    scared: false,
    killed: false,
    deathTimer: 0,
  },
  {
    positionX: 0,
    positionY: 0,
    previousPositionX: 0,
    previousPositionY: 0,
    previousMoveBranched: false,
    whichWay: "down",
    preparing: true,
    atHome: false,
    scared: false,
    killed: false,
    deathTimer: 0,
  },
  {
    positionX: 0,
    positionY: 0,
    previousPositionX: 0,
    previousPositionY: 0,
    previousMoveBranched: false,
    whichWay: "up",
    preparing: true,
    atHome: false,
    scared: false,
    killed: false,
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
    prepareForPlay();
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
      endPlay();
      updateFMP();
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
          endPlay();
          updateFMP();
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

function updateFMP() {
  // prepare FMP parameter (the only data needed)
  const params = {
    player: {
      positionX: player.positionX,
      positionY: player.positionY,
      previousPositionX: player.previousPositionX,
      previousPositionY: player.previousPositionY,
      score: player.score,
      timer: gameGlobals.preparingTimer,
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
  if (player.dying) {
    screenBitmap[player.positionY][player.positionX] =
      PLAYER_FRAMES_KILLED[player.frameNo];
  } else {
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
    } // switch
  } // if

  for (let index = 0; index < enemies.length; index++) {
    const enemy = enemies[index];

    // remove previous enemy sprite position from bitmap
    screenBitmap[enemy.previousPositionY][enemy.previousPositionX] =
      EMPTY_FRAME;

    if (!enemy.preparing) {
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
      } // switch
    } else {
      screenBitmap[enemy.positionY][enemy.positionX] = EMPTY_FRAME;
    } // if
  } // for
}

// - - -

function prepareForPlay() {
  // preparing
  gameGlobals.preparingTimer = PREPARING_FULLTIMER;

  // player ready
  player.positionX = 32;
  player.positionY = 56;
  player.frameNo = 0;
  player.moving = false;
  player.whichWay = "left";
  player.lastKey = "left";
  player.dying = false;

  enemies[0].previousPositionX = enemies[0].positionX;
  enemies[0].previousPositionX = enemies[0].positionY;
  enemies[0].positionX = 0;
  enemies[0].positionY = 0;
  enemies[0].previousMoveBranched = false;
  enemies[0].whichWay = "left";
  enemies[0].preparing = true;
  enemies[0].moving = false;
  enemies[0].atHome = false;
  enemies[0].scared = false;
  enemies[0].deathTimer = 0;

  enemies[1].previousPositionX = enemies[1].positionX;
  enemies[1].previousPositionX = enemies[1].positionY;
  enemies[1].positionX = 0;
  enemies[1].positionY = 0;
  enemies[1].previousMoveBranched = false;
  enemies[1].whichWay = "up";
  enemies[1].preparing = true;
  enemies[1].moving = false;
  enemies[1].atHome = false;
  enemies[1].scared = false;
  enemies[1].deathTimer = 0;

  enemies[2].previousPositionX = enemies[2].positionX;
  enemies[2].previousPositionX = enemies[2].positionY;
  enemies[2].positionX = 0;
  enemies[2].positionY = 0;
  enemies[2].previousMoveBranched = false;
  enemies[2].whichWay = "down";
  enemies[2].preparing = true;
  enemies[2].moving = false;
  enemies[2].atHome = false;
  enemies[2].scared = false;
  enemies[2].deathTimer = 0;

  enemies[3].previousPositionX = enemies[3].positionX;
  enemies[3].previousPositionX = enemies[3].positionY;
  enemies[3].positionX = 0;
  enemies[3].positionY = 0;
  enemies[3].previousMoveBranched = false;
  enemies[3].whichWay = "up";
  enemies[3].preparing = true;
  enemies[3].moving = false;
  enemies[3].atHome = false;
  enemies[3].scared = false;
  enemies[3].deathTimer = 0;

  // UI
  FileMaker.PerformScriptWithOption("PlayerReady 2", "", 0);
  const params = {
    column: player.positionX,
    row: player.positionY,
  };
  FileMaker.PerformScriptWithOption(
    "RefreshContainer ( column, row ) 2",
    JSON.stringify(params),
    0
  );
}

// - - -

function setToPlay() {
  // enemies ready
  enemies = [
    {
      positionX: 33,
      positionY: 27,
      previousPositionX: 0,
      previousPositionY: 0,
      previousMoveBranched: false,
      whichWay: "left",
      preparing: false,
      moving: false,
      atHome: false,
      scared: false,
      killed: false,
      deathTimer: 0,
    },
    {
      positionX: 28,
      positionY: 34,
      previousPositionX: 0,
      previousPositionY: 0,
      previousMoveBranched: false,
      whichWay: "up",
      preparing: false,
      moving: false,
      atHome: true,
      scared: false,
      killed: false,
      deathTimer: 0,
    },
    {
      positionX: 33,
      positionY: 34,
      previousPositionX: 0,
      previousPositionY: 0,
      previousMoveBranched: false,
      whichWay: "down",
      preparing: false,
      moving: false,
      atHome: true,
      scared: false,
      killed: false,
      deathTimer: 0,
    },
    {
      positionX: 38,
      positionY: 34,
      previousPositionX: 0,
      previousPositionY: 0,
      previousMoveBranched: false,
      whichWay: "up",
      preparing: false,
      moving: false,
      atHome: true,
      scared: false,
      killed: false,
      deathTimer: 0,
    },
  ];

  // UI
  FileMaker.PerformScriptWithOption("PlayerSet 2", "", 0);
}

// - - -

function startPlay() {
  // player ready
  player.moving = true;

  for (let index = 0; index < enemies.length; index++) {
    enemies[index].moving = true;
  }

  // UI
  FileMaker.PerformScriptWithOption("PlayerGo 2", "", 0);
}

// - - -

function endPlay() {
  // erase player sprite
  screenBitmap[player.positionY][player.positionX] = EMPTY_FRAME;
  screenBitmap[player.previousPositionY][player.previousPositionX] =
    EMPTY_FRAME;

  // erase enemy sprites
  for (let index = 0; index < enemies.length; index++) {
    const enemy = enemies[index];
    screenBitmap[enemy.positionY][enemy.positionX] = EMPTY_FRAME;
    screenBitmap[enemy.previousPositionY][enemy.previousPositionX] =
      EMPTY_FRAME;
  }
}

// - - - PLAYER - - -

function playerUpdate() {
  if (player.moving) {
    // update previousPositions
    player.previousPositionX = player.positionX;
    player.previousPositionY = player.positionY;
  }

  // player wants to change direction
  if (player.whichWay != player.lastKey) {
    playerWantsToMove(player.lastKey);
  }

  // frames
  if (player.dying) {
    // 27 animations frames while dying
    player.frameNo += 1;
    if (player.frameNo > 26) {
      player.dying = false;
      prepareForPlay();
    }
  } else if (player.moving) {
    // 4 animations frames while moving
    player.frameNo += 1;
    if (player.frameNo > 3) {
      player.frameNo = 0;
    }
  }

  // directional control - stop if next spot is a wall
  if (player.moving) {
    switch (player.whichWay) {
      case "left":
        if (
          screenBitmap[player.positionY][player.positionX - 1] != WALL_FRAME
        ) {
          player.positionX -= 1;
          player.moving = true;
        } else {
          player.moving = false;
        }
        break;

      case "right":
        if (
          screenBitmap[player.positionY][player.positionX + 1] != WALL_FRAME
        ) {
          player.positionX += 1;
          player.moving = true;
        } else {
          player.moving = false;
        }
        break;

      case "up":
        if (
          screenBitmap[player.positionY - 1][player.positionX] != WALL_FRAME
        ) {
          player.positionY -= 1;
          player.moving = true;
        } else {
          player.moving = false;
        }
        break;

      case "down":
        if (
          screenBitmap[player.positionY + 1][player.positionX] != WALL_FRAME
        ) {
          player.positionY += 1;
          player.moving = true;
        } else {
          player.moving = false;
        }
        break;

      default:
        FileMaker.PerformScriptWithOption(
          "Console ( data ) 2",
          "Error for playerMoving; default case - whichWay:" + player.whichWay,
          0
        );
    } // switch

    // wrap-around when crossing either side (tunnel)
    if (player.positionX < 1) {
      player.positionX = 65;
      player.previousPositionX = 1;
    }
    if (player.positionX > 65) {
      player.positionX = 1;
      player.previousPositionX = 65;
    }

    // collision detection
    if (screenBitmap[player.positionY][player.positionX] == PELLET_FRAME) {
      // pellets
      player.score += SCORING_PELLET;
    } else if (
      screenBitmap[player.positionY][player.positionX] == ENERGIZER_FRAME
    ) {
      // energizers
      player.score += SCORING_ENERGIZER;
    } else if (
      screenBitmap[player.positionY][player.positionX] == CHERRY_FRAME
    ) {
      // fruit - cherry
      player.score += SCORING_CHERRY;
    } else if (
      screenBitmap[player.positionY][player.positionX] == STRAWBERRY_FRAME
    ) {
      // fruit - strawberry
      player.score += SCORING_STRAWBERRY;
    } else if (
      screenBitmap[player.positionY][player.positionX] == PEACH_FRAME
    ) {
      // fruit - peach
      player.score += SCORING_PEACH;
    } else if (
      screenBitmap[player.positionY][player.positionX] == APPLE_FRAME
    ) {
      // fruit - apple
      player.score += SCORING_APPLE;
    } else if (
      screenBitmap[player.positionY][player.positionX] == GRAPES_FRAME
    ) {
      // fruit - grapes
      player.score += SCORING_GRAPES;
    } else if (
      screenBitmap[player.positionY][player.positionX] == GALAXIAN_FRAME
    ) {
      // fruit - galaxian
      player.score += SCORING_GALAXIAN;
    } else if (screenBitmap[player.positionY][player.positionX] == BELL_FRAME) {
      // fruit - bell
      player.score += SCORING_BELL;
    } else if (screenBitmap[player.positionY][player.positionX] == KEY_FRAME) {
      // fruit - key
      player.score += SCORING_KEY;
    } else {
      // enemies
      switch (player.whichWay) {
        case "left":
          const nextLeft = screenBitmap[player.positionY][player.positionX - 1];
          if (nextLeft >= ENEMY_FRAME_LEFT && nextLeft < PELLET_FRAME) {
            console.log("tested POS for enemy collision, nextLeft: ", nextLeft);
            player.dying = true;
            player.frameNo = 0;
            player.moving = false;
            for (let index = 0; index < enemies.length; index++) {
              enemies[index].moving = false;
            }
          }
          break;

        case "right":
          const nextRight =
            screenBitmap[player.positionY][player.positionX + 1];
          if (nextRight >= ENEMY_FRAME_LEFT && nextRight < PELLET_FRAME) {
            console.log(
              "tested POS for enemy collision, nextRight: ",
              nextRight
            );
            player.dying = true;
            player.frameNo = 0;
            player.moving = false;
            for (let index = 0; index < enemies.length; index++) {
              enemies[index].moving = false;
            }
          }
          break;

        case "up":
          const nextUp = screenBitmap[player.positionY - 1][player.positionX];
          if (nextUp >= ENEMY_FRAME_LEFT && nextUp < PELLET_FRAME) {
            console.log("tested POS for enemy collision, nextUp: ", nextUp);
            player.dying = true;
            player.frameNo = 0;
            player.moving = false;
            for (let index = 0; index < enemies.length; index++) {
              enemies[index].moving = false;
            }
          }
          break;

        case "down":
          const nextDown = screenBitmap[player.positionY + 1][player.positionX];
          if (nextDown >= ENEMY_FRAME_LEFT && nextDown < PELLET_FRAME) {
            console.log("tested POS for enemy collision, nextDown: ", nextDown);
            player.dying = true;
            player.frameNo = 0;
            player.moving = false;
            for (let index = 0; index < enemies.length; index++) {
              enemies[index].moving = false;
            }
          }
          break;

        default:
          FileMaker.PerformScriptWithOption(
            "Console ( data ) 2",
            "Error for playerMoving; default case - whichWay:" +
              player.whichWay,
            0
          );
      } // switch
    } // if
  } // if
}

// - - -

function playerWantsToMove(whichDirection) {
  // if alive & nor preparing
  if (!player.dying && gameGlobals.preparingTimer == 0) {
    // directional control
    switch (whichDirection) {
      case "left":
        if (
          screenBitmap[player.positionY][player.positionX - 1] != WALL_FRAME
        ) {
          // next position in this direction is not a wall
          player.moving = true;
          player.whichWay = whichDirection;
        }
        break;

      case "right":
        if (
          screenBitmap[player.positionY][player.positionX + 1] != WALL_FRAME
        ) {
          // next position in this direction is not a wall
          player.moving = true;
          player.whichWay = whichDirection;
        }
        break;

      case "up":
        if (
          screenBitmap[player.positionY - 1][player.positionX] != WALL_FRAME
        ) {
          // next position in this direction is not a wall
          player.moving = true;
          player.whichWay = whichDirection;
        }
        break;

      case "down":
        if (
          screenBitmap[player.positionY + 1][player.positionX] != WALL_FRAME
        ) {
          // next position in this direction is not a wall
          player.moving = true;
          player.whichWay = whichDirection;
        }
        break;

      default:
        FileMaker.PerformScriptWithOption(
          "Console ( data ) 2",
          "Error for playerMoving; default case - whichWay:" + player.whichWay,
          0
        );
    } // switch
  } // if
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

    // handle preparingForPlay
    if (gameGlobals.preparingTimer > 0) {
      gameGlobals.preparingTimer -= 1;
      if (gameGlobals.preparingTimer == 0) {
        startPlay();
      } else if (gameGlobals.preparingTimer == PREPARING_HALFTIMER) {
        setToPlay();
      }
    }

    // render everything
    updateFMP();
  } // if
}
