// PacMan
//    v2.0

// - - - VARIABLE DECLARATIONS - - -

// Global vars
var gameGlobals = {
  lastKey: "",
  timerDuration: 70,
  extraLife: false,
  levelIndex: 0,
  levelActive: false,
  levelPelletCount: 0,
  preparingTimer: 0,
  levelCompletedTimer: 0,
  levelCompletedToggle: false,
  levelPreparingTimer: 0,
  firstFruitFlag: false,
  secondFruitFlag: false,
  fruitTimer: 0,
  fruitScore: "",
  fruitScoreTimer: 0,
  blinkTimer: 3,
  blinkFrame: 31,
  enemyMode: 0,
  scatterTimer: 0,
  chaseTimer: 0,
};

// animation frame pattern for player
const PLAYER_FRAMES_LEFT = [2, 3, 1, 3];
const PLAYER_FRAMES_RIGHT = [4, 5, 1, 5];
const PLAYER_FRAMES_UP = [6, 7, 1, 7];
const PLAYER_FRAMES_DOWN = [8, 9, 1, 9];
const PLAYER_FRAMES_STILL = [1];
const PLAYER_FRAMES_KILLED = [
  7, 5, 9, 3, 7, 5, 9, 3, 7, 5, 9, 3, 6, 4, 8, 2, 6, 4, 8, 2, 6, 4, 8, 2, 1, 1,
  0,
];
const ENEMY_FRAME_LEFT = 10;
const ENEMY_FRAME_RIGHT = 11;
const ENEMY_FRAME_UP = 12;
const ENEMY_FRAME_DOWN = 13;
const ENEMY_FRAME_FRIGHTENED = 26;
const ENEMY_FRAME_FRIGHTENEDALT = 27;
const PELLET_FRAME = 30;
const ENERGIZER_FRAME = 31;
const ENERGIZERALT_FRAME = 32; // empty graphic (blinking)
const WALL_FRAME = 50;
const EMPTY_FRAME = 0;
const CHERRY_FRAME = 40;
const STRAWBERRY_FRAME = 41;
const PEACH_FRAME = 42;
const APPLE_FRAME = 43;
const GRAPES_FRAME = 44;
const GALAXIAN_FRAME = 45;
const BELL_FRAME = 46;
const KEY_FRAME = 47;

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
const EXTRA_LIFE_SCORE = 10000;

const PREPARING_FULLTIMER = 30;
const PREPARING_HALFTIMER = 15;
const LEVELCOMPLETED_TIMER = 39;
const LEVELPREPARING_TIMER = 15;
const FRUIT_TIMER = Math.trunc(10000 / gameGlobals.timerDuration); // 10 secs
const FRUIT_SCORE_TIMER = 30;
const ENEMY_FRIGHTENED_TIMER = Math.trunc(8000 / gameGlobals.timerDuration); // 8 secs;
const ENEMY_FRIGHTENED_HALFTIMER = Math.trunc(ENEMY_FRIGHTENED_TIMER / 2); // 4 secs;
const BLINK_TIMER = 3;

// count of pellets
const PELLET_COUNT = 280;

// fruit
const FRUIT_ROW = 41;
const FRUIT_COLUMN = 33;

// enemy A.I.
const ENEMY_INDEX_BLINKY = 0;
const ENEMY_INDEX_PINKY = 1;
const ENEMY_INDEX_INKY = 2;
const ENEMY_INDEX_CLYDE = 3;
const ENEMY_MODE_SCATTER = 0;
const ENEMY_MODE_CHASE = 1;
const ENEMY_MODE_FRIGHTENED = 2;

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
const initialScreenBitmap = [
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
  keyboardControls: {},
  positionX: 32,
  positionY: 56,
  previousPositionX: 0,
  previousPositionY: 0,
  frameNo: 0,
  moving: false,
  whichWay: "left",
  lastKey: "left",
  score: 0,
  lives: 3,
  dying: false,
};

var enemies = [
  {
    positionX: 0,
    positionY: 0,
    previousPositionX: 0,
    previousPositionY: 0,
    previousFrame: 0,
    targetTileX: 0,
    targetTileY: 0,
    whichWay: "",
    nextDirection: "",
    preparing: true,
    atHome: false,
    frightened: false,
    frightenedFrame: 0,
    killed: false,
    deathTimer: 0,
  },
  {
    positionX: 0,
    positionY: 0,
    previousPositionX: 0,
    previousPositionY: 0,
    previousFrame: 0,
    targetTileX: 0,
    targetTileY: 0,
    whichWay: "",
    nextDirection: "",
    preparing: true,
    atHome: false,
    frightened: false,
    frightenedFrame: 0,
    killed: false,
    deathTimer: 0,
  },
  {
    positionX: 0,
    positionY: 0,
    previousPositionX: 0,
    previousPositionY: 0,
    previousFrame: 0,
    targetTileX: 0,
    targetTileY: 0,
    whichWay: "",
    nextDirection: "",
    preparing: true,
    atHome: false,
    frightened: false,
    frightenedFrame: 0,
    killed: false,
    deathTimer: 0,
  },
  {
    positionX: 0,
    positionY: 0,
    previousPositionX: 0,
    previousPositionY: 0,
    previousFrame: 0,
    targetTileX: 0,
    targetTileY: 0,
    whichWay: "",
    nextDirection: "",
    preparing: true,
    atHome: false,
    frightened: false,
    frightenedFrame: 0,
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
    prepareLevel();
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
  keyRouting(keys.whichKey, keys.keyCode);

  //   // ignore if same as last key press captured
  //   if (gameGlobals.lastKey != e.keyCode) {
  //     gameGlobals.lastKey = e.keyCode;
  //     // FileMaker.PerformScriptWithOption(
  //     //   "Keyboard ( data ) 2",
  //     //   JSON.stringify(keys),
  //     //   0
  //     // );
  //     keyRouting(keys.whichKey, keys.keyCode);
  //   }
});

// $(document).keyup(function (e) {
//   gameGlobals.lastKey = "";
// var keys = new Object();
// keys.whichKey = " ";
// FileMaker.PerformScriptWithOption(
//   "Keyboard ( data ) 2",
//   JSON.stringify(keys),
//   0
// );
// });

// - - - USER INPUT - - -

function incomingUserControls(keyboardControls) {
  // console.log("incomingUserControls, keyboardControls: ", keyboardControls);
  player.keyboardControls = JSON.parse(keyboardControls);
}

function keyRouting(whichKey, keyCode) {
  // console.log(
  //   "keyRouting, player.up: ",
  //   player.keyboardControls.up,
  //   "; player.rt: ",
  //   player.keyboardControls.right,
  //   "; player.dn: ",
  //   player.keyboardControls.down,
  //   "; player.lt: ",
  //   player.keyboardControls.left,
  //   "; whichKey: ",
  //   whichKey
  // );
  switch (whichKey) {
    // Mac - A key
    case player.keyboardControls.up:
      player.lastKey = "up";
      break;

    // Mac - Z key
    case player.keyboardControls.down:
      player.lastKey = "down";
      break;

    // Mac - comma key
    case player.keyboardControls.left:
      player.lastKey = "left";
      break;

    // Mac - period key
    case player.keyboardControls.right:
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
      console.log("keyRouting DEFAULT (no Mac keys), whichKey: ", whichKey);
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
      level: gameGlobals.levelIndex,
      score: player.score,
      lives: player.lives,
    },
    fruit: {
      fruitX: FRUIT_COLUMN,
      fruitY: FRUIT_ROW,
      fruitScore: player.fruitScore,
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
  //    NOTE: this script also runs a sub-script that sends keyboardControls
  //            to our function "incomingUserControls(keyboardControls)"
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
  // ENEMIES
  for (let index = 0; index < enemies.length; index++) {
    const enemy = enemies[index];

    // remove previous enemy sprite position from bitmap; replace with empty or pellet or energizer
    if (enemy.previousFrame == PELLET_FRAME) {
      screenBitmap[enemy.previousPositionY][enemy.previousPositionX] =
        PELLET_FRAME;
    } else if (enemy.previousFrame == ENERGIZER_FRAME) {
      screenBitmap[enemy.previousPositionY][enemy.previousPositionX] =
        ENERGIZER_FRAME;
    } else if (enemy.previousFrame == ENERGIZERALT_FRAME) {
      screenBitmap[enemy.previousPositionY][enemy.previousPositionX] =
        ENERGIZERALT_FRAME;
    } else {
      screenBitmap[enemy.previousPositionY][enemy.previousPositionX] =
        EMPTY_FRAME;
    }
    // update previousFrame before moving sprite to new location
    enemy.previousFrame = screenBitmap[enemy.positionY][enemy.positionX];

    if (!enemy.preparing) {
      // add current enemy sprite position to bitmap
      if (enemy.frightened) {
        if (gameGlobals.frightenedTimer < ENEMY_FRIGHTENED_HALFTIMER) {
          // if timer is half fininshed, begin frightened icon "flashing"
          if (gameGlobals.frightenedTimer % 3 == 0) {
            // flash every 3rd frame
            if (enemy.frightenedFrame == ENEMY_FRAME_FRIGHTENED) {
              enemy.frightenedFrame = ENEMY_FRAME_FRIGHTENEDALT;
            } else {
              enemy.frightenedFrame = ENEMY_FRAME_FRIGHTENED;
            }
          }
        } else {
          enemy.frightenedFrame = ENEMY_FRAME_FRIGHTENED;
        }
        screenBitmap[enemy.positionY][enemy.positionX] = enemy.frightenedFrame;
      } else {
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
      } // if
    } else {
      screenBitmap[enemy.positionY][enemy.positionX] = EMPTY_FRAME;
    } // if
  } // for

  // PLAYER
  // remove previous player sprite position from bitmap
  screenBitmap[player.previousPositionY][player.previousPositionX] =
    EMPTY_FRAME;

  // add current player sprite position to bitmap
  if (gameGlobals.levelCompletedTimer > 0) {
    screenBitmap[player.positionY][player.positionX] =
      PLAYER_FRAMES_STILL[player.frameNo];
    //
  } else if (player.dying) {
    screenBitmap[player.positionY][player.positionX] =
      PLAYER_FRAMES_KILLED[player.frameNo];
    //
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
  enemies[0].previousPositionY = enemies[0].positionY;
  enemies[0].positionX = 0;
  enemies[0].positionY = 0;
  enemies[0].whichWay = "left";
  enemies[0].nextDirection = "left";
  enemies[0].preparing = true;
  enemies[0].moving = false;
  enemies[0].atHome = false;
  enemies[0].frightened = false;
  enemies[0].frightenedFrame = 0;
  enemies[0].deathTimer = 0;

  enemies[1].previousPositionX = enemies[1].positionX;
  enemies[1].previousPositionY = enemies[1].positionY;
  enemies[1].positionX = 0;
  enemies[1].positionY = 0;
  enemies[1].whichWay = "up";
  enemies[1].nextDirection = "up";
  enemies[1].preparing = true;
  enemies[1].moving = false;
  enemies[1].atHome = false;
  enemies[1].frightened = false;
  enemies[1].frightenedFrame = 0;
  enemies[1].deathTimer = 0;

  enemies[2].previousPositionX = enemies[2].positionX;
  enemies[2].previousPositionY = enemies[2].positionY;
  enemies[2].positionX = 0;
  enemies[2].positionY = 0;
  enemies[2].whichWay = "down";
  enemies[2].nextDirection = "down";
  enemies[2].preparing = true;
  enemies[2].moving = false;
  enemies[2].atHome = false;
  enemies[2].frightened = false;
  enemies[2].frightenedFrame = 0;
  enemies[2].deathTimer = 0;

  enemies[3].previousPositionX = enemies[3].positionX;
  enemies[3].previousPositionY = enemies[3].positionY;
  enemies[3].positionX = 0;
  enemies[3].positionY = 0;
  enemies[3].whichWay = "up";
  enemies[3].nextDirection = "up";
  enemies[3].preparing = true;
  enemies[3].moving = false;
  enemies[3].atHome = false;
  enemies[3].frightened = false;
  enemies[3].frightenedFrame = 0;
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
      previousFrame: 0,
      targetTileX: 0,
      targetTileY: 0,
      whichWay: "left",
      nextDirection: "left",
      preparing: false,
      moving: false,
      atHome: false,
      frightened: false,
      frightenedFrame: 0,
      killed: false,
      deathTimer: 0,
    },
    {
      positionX: 22,
      positionY: 34,
      // positionX: 28,
      // positionY: 34,
      previousPositionX: 0,
      previousPositionY: 0,
      previousFrame: 0,
      targetTileX: 0,
      targetTileY: 0,
      whichWay: "up",
      nextDirection: "up",
      preparing: false,
      moving: false,
      atHome: true,
      frightened: false,
      frightenedFrame: 0,
      killed: false,
      deathTimer: 0,
    },
    {
      positionX: 44,
      positionY: 34,
      // positionX: 33,
      // positionY: 34,
      previousPositionX: 0,
      previousPositionY: 0,
      previousFrame: 0,
      targetTileX: 0,
      targetTileY: 0,
      whichWay: "down",
      nextDirection: "down",
      preparing: false,
      moving: false,
      atHome: true,
      frightened: false,
      frightenedFrame: 0,
      killed: false,
      deathTimer: 0,
    },
    {
      positionX: 33,
      positionY: 41,
      // positionX: 38,
      // positionY: 34,
      previousPositionX: 0,
      previousPositionY: 0,
      previousFrame: 0,
      targetTileX: 0,
      targetTileY: 0,
      whichWay: "right",
      nextDirection: "right",
      preparing: false,
      moving: false,
      atHome: true,
      frightened: false,
      frightenedFrame: 0,
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

  // enemies[0].moving = true;
  for (let index = 0; index < enemies.length; index++) {
    enemies[index].moving = true;
  }

  // UI
  FileMaker.PerformScriptWithOption("PlayerGo 2", "", 0);
}

// - - -

function levelCompletion() {
  gameGlobals.levelCompletedTimer = LEVELCOMPLETED_TIMER;

  player.frameNo = 0;
  player.moving = false;
  for (let index = 0; index < enemies.length; index++) {
    enemies[index].moving = false;
  }
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

// - - -

function prepareLevel() {
  gameGlobals.levelActive = true;
  gameGlobals.levelIndex += 1;
  gameGlobals.firstFruitFlag = false;
  gameGlobals.secondFruitFlag = false;
  // gameGlobals.levelPelletCount = PELLET_COUNT;

  // initialize screenBitmap by copying from template (multi-dimensional array)
  //     ref (option #8): https://www.freecodecamp.org/news/how-to-clone-an-array-in-javascript-1d3183468f6a/
  screenBitmap = JSON.parse(JSON.stringify(initialScreenBitmap));
}

// - - -

function addFruit() {
  switch (gameGlobals.levelIndex) {
    case 1:
      screenBitmap[FRUIT_ROW][FRUIT_COLUMN] = CHERRY_FRAME;
      break;

    case 2:
      screenBitmap[FRUIT_ROW][FRUIT_COLUMN] = STRAWBERRY_FRAME;
      break;

    case 3:
      screenBitmap[FRUIT_ROW][FRUIT_COLUMN] = PEACH_FRAME;
      break;

    case 4:
      screenBitmap[FRUIT_ROW][FRUIT_COLUMN] = PEACH_FRAME;
      break;

    case 5:
      screenBitmap[FRUIT_ROW][FRUIT_COLUMN] = APPLE_FRAME;
      break;

    case 6:
      screenBitmap[FRUIT_ROW][FRUIT_COLUMN] = APPLE_FRAME;
      break;

    case 7:
      screenBitmap[FRUIT_ROW][FRUIT_COLUMN] = GRAPES_FRAME;
      break;

    case 8:
      screenBitmap[FRUIT_ROW][FRUIT_COLUMN] = GRAPES_FRAME;
      break;

    case 9:
      screenBitmap[FRUIT_ROW][FRUIT_COLUMN] = GALAXIAN_FRAME;
      break;

    case 10:
      screenBitmap[FRUIT_ROW][FRUIT_COLUMN] = GALAXIAN_FRAME;
      break;

    case 11:
      screenBitmap[FRUIT_ROW][FRUIT_COLUMN] = BELL_FRAME;
      break;

    case 12:
      screenBitmap[FRUIT_ROW][FRUIT_COLUMN] = BELL_FRAME;
      break;

    default:
      screenBitmap[FRUIT_ROW][FRUIT_COLUMN] = KEY_FRAME;
      break;
  }
}

// - - -

function removeFruit() {
  screenBitmap[FRUIT_ROW][FRUIT_COLUMN] = EMPTY_FRAME;
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
    //
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
  } // if

  // collision detection
  if (!player.dying) {
    if (screenBitmap[player.positionY][player.positionX] == PELLET_FRAME) {
      // pellets
      player.score += SCORING_PELLET;
    } else if (
      screenBitmap[player.positionY][player.positionX] == ENERGIZER_FRAME ||
      screenBitmap[player.positionY][player.positionX] == ENERGIZERALT_FRAME
    ) {
      // energizers
      player.score += SCORING_ENERGIZER;
      for (let index = 0; index < enemies.length; index++) {
        // enbemies become frightened during timer
        enemies[index].frightened = true;
      }
      gameGlobals.frightenedTimer = ENEMY_FRIGHTENED_TIMER;
    } else if (
      screenBitmap[player.positionY][player.positionX] == CHERRY_FRAME
    ) {
      // fruit - cherry
      player.score += SCORING_CHERRY;
      player.fruitScore = SCORING_CHERRY;
      gameGlobals.fruitScoreTimer = FRUIT_SCORE_TIMER;
    } else if (
      screenBitmap[player.positionY][player.positionX] == STRAWBERRY_FRAME
    ) {
      // fruit - strawberry
      player.score += SCORING_STRAWBERRY;
      player.fruitScore = SCORING_STRAWBERRY;
      gameGlobals.fruitScoreTimer = FRUIT_SCORE_TIMER;
    } else if (
      screenBitmap[player.positionY][player.positionX] == PEACH_FRAME
    ) {
      // fruit - peach
      player.score += SCORING_PEACH;
      player.fruitScore = SCORING_PEACH;
      gameGlobals.fruitScoreTimer = FRUIT_SCORE_TIMER;
    } else if (
      screenBitmap[player.positionY][player.positionX] == APPLE_FRAME
    ) {
      // fruit - apple
      player.score += SCORING_APPLE;
      player.fruitScore = SCORING_APPLE;
      gameGlobals.fruitScoreTimer = FRUIT_SCORE_TIMER;
    } else if (
      screenBitmap[player.positionY][player.positionX] == GRAPES_FRAME
    ) {
      // fruit - grapes
      player.score += SCORING_GRAPES;
      player.fruitScore = SCORING_GRAPES;
      gameGlobals.fruitScoreTimer = FRUIT_SCORE_TIMER;
    } else if (
      screenBitmap[player.positionY][player.positionX] == GALAXIAN_FRAME
    ) {
      // fruit - galaxian
      player.score += SCORING_GALAXIAN;
      player.fruitScore = SCORING_GALAXIAN;
      gameGlobals.fruitScoreTimer = FRUIT_SCORE_TIMER;
    } else if (screenBitmap[player.positionY][player.positionX] == BELL_FRAME) {
      // fruit - bell
      player.score += SCORING_BELL;
      player.fruitScore = SCORING_BELL;
      gameGlobals.fruitScoreTimer = FRUIT_SCORE_TIMER;
    } else if (screenBitmap[player.positionY][player.positionX] == KEY_FRAME) {
      // fruit - key
      player.score += SCORING_KEY;
      player.fruitScore = SCORING_KEY;
      gameGlobals.fruitScoreTimer = FRUIT_SCORE_TIMER;
    } else {
      // enemies
      for (let index = 0; index < enemies.length; index++) {
        const enemy = enemies[index];
        if (
          player.positionX == enemy.positionX &&
          player.positionY == enemy.positionY
        ) {
          player.dying = true;
          player.lives -= 1;
          player.frameNo = 0;
          player.moving = false;
          for (let index = 0; index < enemies.length; index++) {
            enemies[index].moving = false;
          }
        }
      }
    } // if
  } // if
}

// - - -

function playerWantsToMove(whichDirection) {
  // if level active, not preparing, & player alive
  if (
    !player.dying &&
    gameGlobals.preparingTimer == 0 &&
    gameGlobals.levelCompletedTimer == 0
  ) {
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

function distanceFromTarget(enemy, tile) {
  var distance;
  const startY = enemy.targetTileY;
  const startX = enemy.targetTileX;
  const endY = tile[0];
  const endX = tile[1];

  const lengthY = Math.abs(endY - startY);
  const lengthX = Math.abs(endX - startX);

  if (lengthX == 0) {
    distance = lengthY;
  } else if (lengthY == 0) {
    distance = lengthX;
  } else {
    // Pathagoriam Therum
    distance = Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2));
  }

  return distance;
}

function enemiesNextMoveUsingDossierAI(enemy, nameIndex) {
  var nextTile;
  var tileLeft, tileUp, tileRight, tileDown;
  var tileLeftDistance = 1000;
  var tileUpDistance = 1000;
  var tileRightDistance = 1000;
  var tileDownDistance = 1000;

  switch (nameIndex) {
    case ENEMY_INDEX_BLINKY:
      switch (gameGlobals.enemyMode) {
        case ENEMY_MODE_SCATTER:
          enemy.targetTileX = 61;
          enemy.targetTileY = 1;

          switch (enemy.whichWay) {
            case "left":
              nextTile = [enemy.positionY, enemy.positionX];
              tileLeft = [nextTile[0], nextTile[1] - 1];
              tileLeftFrame = screenBitmap[tileLeft[0]][tileLeft[1]];
              tileUp = [nextTile[0] - 1, nextTile[1]];
              tileUpFrame = screenBitmap[tileUp[0]][tileUp[1]];
              //tileRight
              //tileRightFrame = ghosts never volumtarily reverse direction
              tileDown = [nextTile[0] + 1, nextTile[1]];
              tileDownFrame = screenBitmap[tileDown[0]][tileDown[1]];

              // calculate distances between target and potential next tiles
              if (tileLeftFrame != WALL_FRAME) {
                tileLeftDistance = parseFloat(
                  distanceFromTarget(enemy, tileLeft).toPrecision(4)
                );
              }
              if (tileUpFrame != WALL_FRAME) {
                tileUpDistance = parseFloat(
                  distanceFromTarget(enemy, tileUp).toPrecision(4)
                );
              }
              if (tileDownFrame != WALL_FRAME) {
                tileDownDistance = parseFloat(
                  distanceFromTarget(enemy, tileDown).toPrecision(4)
                );
              }

              // determine the best direction
              // dossier: To break the tie, the ghost prefers directions in this order: up, left, down, right
              if (
                tileUpDistance <= tileDownDistance &&
                tileUpDistance <= tileLeftDistance
              ) {
                enemy.nextDirection = "up";
              } else if (
                tileLeftDistance <= tileUpDistance &&
                tileLeftDistance <= tileDownDistance
              ) {
                enemy.nextDirection = "left";
              } else if (
                tileDownDistance <= tileLeftDistance &&
                tileDownDistance <= tileUpDistance
              ) {
                enemy.nextDirection = "down";
              }
              // console.log(
              //   "enemy.left, position: ",
              //   enemy.positionX,
              //   ",",
              //   enemy.positionY,
              //   "nextTile: ",
              //   nextTile,
              //   "; nextDirection: ",
              //   enemy.nextDirection,
              //   "; tLtFrm: ",
              //   tileLeftFrame,
              //   "; tLtDist: ",
              //   tileLeftDistance,
              //   "; tUpFrm: ",
              //   tileUpFrame,
              //   "; tUpDist: ",
              //   tileUpDistance,
              //   "; tDnFrm: ",
              //   tileDownFrame,
              //   "; tDnDist: ",
              //   tileDownDistance
              // );
              break;

            case "up":
              nextTile = [enemy.positionY, enemy.positionX];
              tileLeft = [nextTile[0], nextTile[1] - 1];
              tileLeftFrame = screenBitmap[tileLeft[0]][tileLeft[1]];
              tileUp = [nextTile[0] - 1, nextTile[1]];
              tileUpFrame = screenBitmap[tileUp[0]][tileUp[1]];
              tileRight = [nextTile[0], nextTile[1] + 1];
              tileRightFrame = screenBitmap[tileRight[0]][tileRight[1]];
              //tileDown
              //tileDownFrame = ghosts never volumtarily reverse direction

              // calculate distances between target and potential next tiles
              if (tileLeftFrame != WALL_FRAME) {
                tileLeftDistance = parseFloat(
                  distanceFromTarget(enemy, tileLeft).toPrecision(4)
                );
              }
              if (tileUpFrame != WALL_FRAME) {
                tileUpDistance = parseFloat(
                  distanceFromTarget(enemy, tileUp).toPrecision(4)
                );
              }
              if (tileRightFrame != WALL_FRAME) {
                tileRightDistance = parseFloat(
                  distanceFromTarget(enemy, tileRight).toPrecision(4)
                );
              }

              // determine the best direction
              // dossier: To break the tie, the ghost prefers directions in this order: up, left, down, right
              if (
                tileUpDistance <= tileRightDistance &&
                tileUpDistance <= tileLeftDistance
              ) {
                enemy.nextDirection = "up";
              } else if (
                tileLeftDistance <= tileUpDistance &&
                tileLeftDistance <= tileRightDistance
              ) {
                enemy.nextDirection = "left";
              } else if (
                tileRightDistance <= tileLeftDistance &&
                tileRightDistance <= tileUpDistance
              ) {
                enemy.nextDirection = "right";
              }
              // console.log(
              //   "enemy.up, position: ",
              //   enemy.positionX,
              //   ",",
              //   enemy.positionY,
              //   "nextTile: ",
              //   nextTile,
              //   "; nextDirection: ",
              //   enemy.nextDirection,
              //   "; tLtFrm: ",
              //   tileLeftFrame,
              //   "; tLtDist: ",
              //   tileLeftDistance,
              //   "; tUpFrm: ",
              //   tileUpFrame,
              //   "; tUpDist: ",
              //   tileUpDistance,
              //   "; tRtFrm: ",
              //   tileRightFrame,
              //   "; tRtDist: ",
              //   tileRightDistance
              // );
              break;

            case "right":
              nextTile = [enemy.positionY, enemy.positionX];
              //tileLeft
              //tileLeftFrame = ghosts never volumtarily reverse direction
              tileUp = [nextTile[0] - 1, nextTile[1]];
              tileUpFrame = screenBitmap[tileUp[0]][tileUp[1]];
              tileRight = [nextTile[0], nextTile[1] + 1];
              tileRightFrame = screenBitmap[tileRight[0]][tileRight[1]];
              tileDown = [nextTile[0] + 1, nextTile[1]];
              tileDownFrame = screenBitmap[tileDown[0]][tileDown[1]];

              // calculate distances between target and potential next tiles
              if (tileUpFrame != WALL_FRAME) {
                tileUpDistance = parseFloat(
                  distanceFromTarget(enemy, tileUp).toPrecision(4)
                );
              }
              if (tileRightFrame != WALL_FRAME) {
                tileRightDistance = parseFloat(
                  distanceFromTarget(enemy, tileRight).toPrecision(4)
                );
              }
              if (tileDownFrame != WALL_FRAME) {
                tileDownDistance = parseFloat(
                  distanceFromTarget(enemy, tileDown).toPrecision(4)
                );
              }

              // determine the best direction
              // dossier: To break the tie, the ghost prefers directions in this order: up, left, down, right
              if (
                tileUpDistance <= tileRightDistance &&
                tileUpDistance <= tileDownDistance
              ) {
                enemy.nextDirection = "up";
              } else if (
                tileDownDistance <= tileUpDistance &&
                tileDownDistance <= tileRightDistance
              ) {
                enemy.nextDirection = "down";
              } else if (
                tileRightDistance <= tileDownDistance &&
                tileRightDistance <= tileUpDistance
              ) {
                enemy.nextDirection = "right";
              }
              // console.log(
              //   "enemy.right, position: ",
              //   enemy.positionX,
              //   ",",
              //   enemy.positionY,
              //   "nextTile: ",
              //   nextTile,
              //   "; nextDirection: ",
              //   enemy.nextDirection,
              //   "; tUpFrm: ",
              //   tileUpFrame,
              //   "; tUpDist: ",
              //   tileUpDistance,
              //   "; tRtFrm: ",
              //   tileRightFrame,
              //   "; tRtDist: ",
              //   tileRightDistance,
              //   "; tDnFrm: ",
              //   tileDownFrame,
              //   "; tDnDist: ",
              //   tileDownDistance
              // );
              break;

            case "down":
              nextTile = [enemy.positionY, enemy.positionX];
              tileLeft = [nextTile[0], nextTile[1] - 1];
              tileLeftFrame = screenBitmap[tileLeft[0]][tileLeft[1]];
              //tileUp
              //tileUpFrame = ghosts never volumtarily reverse direction
              tileRight = [nextTile[0], nextTile[1] + 1];
              tileRightFrame = screenBitmap[tileRight[0]][tileRight[1]];
              tileDown = [nextTile[0] + 1, nextTile[1]];
              tileDownFrame = screenBitmap[tileDown[0]][tileDown[1]];

              // calculate distances between target and potential next tiles
              if (tileLeftFrame != WALL_FRAME) {
                tileLeftDistance = parseFloat(
                  distanceFromTarget(enemy, tileLeft).toPrecision(4)
                );
              }
              if (tileRightFrame != WALL_FRAME) {
                tileRightDistance = parseFloat(
                  distanceFromTarget(enemy, tileRight).toPrecision(4)
                );
              }
              if (tileDownFrame != WALL_FRAME) {
                tileDownDistance = parseFloat(
                  distanceFromTarget(enemy, tileDown).toPrecision(4)
                );
              }

              // determine the best direction
              // dossier: To break the tie, the ghost prefers directions in this order: up, left, down, right
              if (
                tileLeftDistance <= tileRightDistance &&
                tileLeftDistance <= tileDownDistance
              ) {
                enemy.nextDirection = "left";
              } else if (
                tileDownDistance <= tileLeftDistance &&
                tileDownDistance <= tileRightDistance
              ) {
                enemy.nextDirection = "down";
              } else if (
                tileRightDistance <= tileDownDistance &&
                tileRightDistance <= tileLeftDistance
              ) {
                enemy.nextDirection = "right";
              }

              // console.log(
              //   "enemy.down, position: ",
              //   enemy.positionX,
              //   ",",
              //   enemy.positionY,
              //   "nextTile: ",
              //   nextTile,
              //   "; nextDirection: ",
              //   enemy.nextDirection,
              //   "; tLtFrm: ",
              //   tileLeftFrame,
              //   "; tLtDist: ",
              //   tileLeftDistance,
              //   "; tRtFrm: ",
              //   tileRightFrame,
              //   "; tRtDist: ",
              //   tileRightDistance,
              //   "; tDnFrm: ",
              //   tileDownFrame,
              //   "; tDnDist: ",
              //   tileDownDistance
              // );
              break;

            default:
              break;
          }

          break;

        case ENEMY_MODE_CHASE:
          enemy.targetTileX = player.positionX;
          enemy.targetTileY = player.positionY;

          break;

        case ENEMY_MODE_FRIGHTENED:
          switch (enemy.whichWay) {
            case "left":
              break;
            case "right":
              break;
            case "up":
              break;
            case "down":
              break;

            default:
              break;
          }

          break;

        default:
          break;
      }
      break;

    case ENEMY_INDEX_PINKY:
      switch (gameGlobals.enemyMode) {
        case ENEMY_MODE_SCATTER:
          enemy.targetTileX = 5;
          enemy.targetTileY = 1;

          switch (enemy.whichWay) {
            case "left":
              nextTile = [enemy.positionY, enemy.positionX];
              tileLeft = [nextTile[0], nextTile[1] - 1];
              tileLeftFrame = screenBitmap[tileLeft[0]][tileLeft[1]];
              tileUp = [nextTile[0] - 1, nextTile[1]];
              tileUpFrame = screenBitmap[tileUp[0]][tileUp[1]];
              //tileRight
              //tileRightFrame = ghosts never volumtarily reverse direction
              tileDown = [nextTile[0] + 1, nextTile[1]];
              tileDownFrame = screenBitmap[tileDown[0]][tileDown[1]];

              // calculate distances between target and potential next tiles
              if (tileLeftFrame != WALL_FRAME) {
                tileLeftDistance = parseFloat(
                  distanceFromTarget(enemy, tileLeft).toPrecision(4)
                );
              }
              if (tileUpFrame != WALL_FRAME) {
                tileUpDistance = parseFloat(
                  distanceFromTarget(enemy, tileUp).toPrecision(4)
                );
              }
              if (tileDownFrame != WALL_FRAME) {
                tileDownDistance = parseFloat(
                  distanceFromTarget(enemy, tileDown).toPrecision(4)
                );
              }

              // determine the best direction
              // dossier: To break the tie, the ghost prefers directions in this order: up, left, down, right
              if (
                tileUpDistance <= tileDownDistance &&
                tileUpDistance <= tileLeftDistance
              ) {
                enemy.nextDirection = "up";
              } else if (
                tileLeftDistance <= tileUpDistance &&
                tileLeftDistance <= tileDownDistance
              ) {
                enemy.nextDirection = "left";
              } else if (
                tileDownDistance <= tileLeftDistance &&
                tileDownDistance <= tileUpDistance
              ) {
                enemy.nextDirection = "down";
              }
              // console.log(
              //   "enemy.left, position: ",
              //   enemy.positionX,
              //   ",",
              //   enemy.positionY,
              //   "nextTile: ",
              //   nextTile,
              //   "; nextDirection: ",
              //   enemy.nextDirection,
              //   "; tLtFrm: ",
              //   tileLeftFrame,
              //   "; tLtDist: ",
              //   tileLeftDistance,
              //   "; tUpFrm: ",
              //   tileUpFrame,
              //   "; tUpDist: ",
              //   tileUpDistance,
              //   "; tDnFrm: ",
              //   tileDownFrame,
              //   "; tDnDist: ",
              //   tileDownDistance
              // );
              break;

            case "up":
              nextTile = [enemy.positionY, enemy.positionX];
              tileLeft = [nextTile[0], nextTile[1] - 1];
              tileLeftFrame = screenBitmap[tileLeft[0]][tileLeft[1]];
              tileUp = [nextTile[0] - 1, nextTile[1]];
              tileUpFrame = screenBitmap[tileUp[0]][tileUp[1]];
              tileRight = [nextTile[0], nextTile[1] + 1];
              tileRightFrame = screenBitmap[tileRight[0]][tileRight[1]];
              //tileDown
              //tileDownFrame = ghosts never volumtarily reverse direction

              // calculate distances between target and potential next tiles
              if (tileLeftFrame != WALL_FRAME) {
                tileLeftDistance = parseFloat(
                  distanceFromTarget(enemy, tileLeft).toPrecision(4)
                );
              }
              if (tileUpFrame != WALL_FRAME) {
                tileUpDistance = parseFloat(
                  distanceFromTarget(enemy, tileUp).toPrecision(4)
                );
              }
              if (tileRightFrame != WALL_FRAME) {
                tileRightDistance = parseFloat(
                  distanceFromTarget(enemy, tileRight).toPrecision(4)
                );
              }

              // determine the best direction
              // dossier: To break the tie, the ghost prefers directions in this order: up, left, down, right
              if (
                tileUpDistance <= tileRightDistance &&
                tileUpDistance <= tileLeftDistance
              ) {
                enemy.nextDirection = "up";
              } else if (
                tileLeftDistance <= tileUpDistance &&
                tileLeftDistance <= tileRightDistance
              ) {
                enemy.nextDirection = "left";
              } else if (
                tileRightDistance <= tileLeftDistance &&
                tileRightDistance <= tileUpDistance
              ) {
                enemy.nextDirection = "right";
              }
              // console.log(
              //   "enemy.up, position: ",
              //   enemy.positionX,
              //   ",",
              //   enemy.positionY,
              //   "nextTile: ",
              //   nextTile,
              //   "; nextDirection: ",
              //   enemy.nextDirection,
              //   "; tLtFrm: ",
              //   tileLeftFrame,
              //   "; tLtDist: ",
              //   tileLeftDistance,
              //   "; tUpFrm: ",
              //   tileUpFrame,
              //   "; tUpDist: ",
              //   tileUpDistance,
              //   "; tRtFrm: ",
              //   tileRightFrame,
              //   "; tRtDist: ",
              //   tileRightDistance
              // );
              break;

            case "right":
              nextTile = [enemy.positionY, enemy.positionX];
              //tileLeft
              //tileLeftFrame = ghosts never volumtarily reverse direction
              tileUp = [nextTile[0] - 1, nextTile[1]];
              tileUpFrame = screenBitmap[tileUp[0]][tileUp[1]];
              tileRight = [nextTile[0], nextTile[1] + 1];
              tileRightFrame = screenBitmap[tileRight[0]][tileRight[1]];
              tileDown = [nextTile[0] + 1, nextTile[1]];
              tileDownFrame = screenBitmap[tileDown[0]][tileDown[1]];

              // calculate distances between target and potential next tiles
              if (tileUpFrame != WALL_FRAME) {
                tileUpDistance = parseFloat(
                  distanceFromTarget(enemy, tileUp).toPrecision(4)
                );
              }
              if (tileRightFrame != WALL_FRAME) {
                tileRightDistance = parseFloat(
                  distanceFromTarget(enemy, tileRight).toPrecision(4)
                );
              }
              if (tileDownFrame != WALL_FRAME) {
                tileDownDistance = parseFloat(
                  distanceFromTarget(enemy, tileDown).toPrecision(4)
                );
              }

              // determine the best direction
              // dossier: To break the tie, the ghost prefers directions in this order: up, left, down, right
              if (
                tileUpDistance <= tileRightDistance &&
                tileUpDistance <= tileDownDistance
              ) {
                enemy.nextDirection = "up";
              } else if (
                tileDownDistance <= tileUpDistance &&
                tileDownDistance <= tileRightDistance
              ) {
                enemy.nextDirection = "down";
              } else if (
                tileRightDistance <= tileDownDistance &&
                tileRightDistance <= tileUpDistance
              ) {
                enemy.nextDirection = "right";
              }
              // console.log(
              //   "enemy.right, position: ",
              //   enemy.positionX,
              //   ",",
              //   enemy.positionY,
              //   "nextTile: ",
              //   nextTile,
              //   "; nextDirection: ",
              //   enemy.nextDirection,
              //   "; tUpFrm: ",
              //   tileUpFrame,
              //   "; tUpDist: ",
              //   tileUpDistance,
              //   "; tRtFrm: ",
              //   tileRightFrame,
              //   "; tRtDist: ",
              //   tileRightDistance,
              //   "; tDnFrm: ",
              //   tileDownFrame,
              //   "; tDnDist: ",
              //   tileDownDistance
              // );
              break;

            case "down":
              nextTile = [enemy.positionY, enemy.positionX];
              tileLeft = [nextTile[0], nextTile[1] - 1];
              tileLeftFrame = screenBitmap[tileLeft[0]][tileLeft[1]];
              //tileUp
              //tileUpFrame = ghosts never volumtarily reverse direction
              tileRight = [nextTile[0], nextTile[1] + 1];
              tileRightFrame = screenBitmap[tileRight[0]][tileRight[1]];
              tileDown = [nextTile[0] + 1, nextTile[1]];
              tileDownFrame = screenBitmap[tileDown[0]][tileDown[1]];

              // calculate distances between target and potential next tiles
              if (tileLeftFrame != WALL_FRAME) {
                tileLeftDistance = parseFloat(
                  distanceFromTarget(enemy, tileLeft).toPrecision(4)
                );
              }
              if (tileRightFrame != WALL_FRAME) {
                tileRightDistance = parseFloat(
                  distanceFromTarget(enemy, tileRight).toPrecision(4)
                );
              }
              if (tileDownFrame != WALL_FRAME) {
                tileDownDistance = parseFloat(
                  distanceFromTarget(enemy, tileDown).toPrecision(4)
                );
              }

              // determine the best direction
              // dossier: To break the tie, the ghost prefers directions in this order: up, left, down, right
              if (
                tileLeftDistance <= tileRightDistance &&
                tileLeftDistance <= tileDownDistance
              ) {
                enemy.nextDirection = "left";
              } else if (
                tileDownDistance <= tileLeftDistance &&
                tileDownDistance <= tileRightDistance
              ) {
                enemy.nextDirection = "down";
              } else if (
                tileRightDistance <= tileDownDistance &&
                tileRightDistance <= tileLeftDistance
              ) {
                enemy.nextDirection = "right";
              }

              // console.log(
              //   "enemy.down, position: ",
              //   enemy.positionX,
              //   ",",
              //   enemy.positionY,
              //   "nextTile: ",
              //   nextTile,
              //   "; nextDirection: ",
              //   enemy.nextDirection,
              //   "; tLtFrm: ",
              //   tileLeftFrame,
              //   "; tLtDist: ",
              //   tileLeftDistance,
              //   "; tRtFrm: ",
              //   tileRightFrame,
              //   "; tRtDist: ",
              //   tileRightDistance,
              //   "; tDnFrm: ",
              //   tileDownFrame,
              //   "; tDnDist: ",
              //   tileDownDistance
              // );
              break;

            default:
              break;
          }

          break;

        case ENEMY_MODE_CHASE:
          switch (enemy.whichWay) {
            case "left":
              break;
            case "right":
              break;
            case "up":
              break;
            case "down":
              break;

            default:
              break;
          }

          break;

        case ENEMY_MODE_FRIGHTENED:
          switch (enemy.whichWay) {
            case "left":
              break;
            case "right":
              break;
            case "up":
              break;
            case "down":
              break;

            default:
              break;
          }

          break;

        default:
          break;
      }
      break;

    case ENEMY_INDEX_INKY:
      switch (gameGlobals.enemyMode) {
        case ENEMY_MODE_SCATTER:
          enemy.targetTileX = 66;
          enemy.targetTileY = 73;

          switch (enemy.whichWay) {
            case "left":
              nextTile = [enemy.positionY, enemy.positionX];
              tileLeft = [nextTile[0], nextTile[1] - 1];
              tileLeftFrame = screenBitmap[tileLeft[0]][tileLeft[1]];
              tileUp = [nextTile[0] - 1, nextTile[1]];
              tileUpFrame = screenBitmap[tileUp[0]][tileUp[1]];
              //tileRight
              //tileRightFrame = ghosts never volumtarily reverse direction
              tileDown = [nextTile[0] + 1, nextTile[1]];
              tileDownFrame = screenBitmap[tileDown[0]][tileDown[1]];

              // calculate distances between target and potential next tiles
              if (tileLeftFrame != WALL_FRAME) {
                tileLeftDistance = parseFloat(
                  distanceFromTarget(enemy, tileLeft).toPrecision(4)
                );
              }
              if (tileUpFrame != WALL_FRAME) {
                tileUpDistance = parseFloat(
                  distanceFromTarget(enemy, tileUp).toPrecision(4)
                );
              }
              if (tileDownFrame != WALL_FRAME) {
                tileDownDistance = parseFloat(
                  distanceFromTarget(enemy, tileDown).toPrecision(4)
                );
              }

              // determine the best direction
              // dossier: To break the tie, the ghost prefers directions in this order: up, left, down, right
              if (
                tileUpDistance <= tileDownDistance &&
                tileUpDistance <= tileLeftDistance
              ) {
                enemy.nextDirection = "up";
              } else if (
                tileLeftDistance <= tileUpDistance &&
                tileLeftDistance <= tileDownDistance
              ) {
                enemy.nextDirection = "left";
              } else if (
                tileDownDistance <= tileLeftDistance &&
                tileDownDistance <= tileUpDistance
              ) {
                enemy.nextDirection = "down";
              }
              // console.log(
              //   "enemy.left, position: ",
              //   enemy.positionX,
              //   ",",
              //   enemy.positionY,
              //   "nextTile: ",
              //   nextTile,
              //   "; nextDirection: ",
              //   enemy.nextDirection,
              //   "; tLtFrm: ",
              //   tileLeftFrame,
              //   "; tLtDist: ",
              //   tileLeftDistance,
              //   "; tUpFrm: ",
              //   tileUpFrame,
              //   "; tUpDist: ",
              //   tileUpDistance,
              //   "; tDnFrm: ",
              //   tileDownFrame,
              //   "; tDnDist: ",
              //   tileDownDistance
              // );
              break;

            case "up":
              nextTile = [enemy.positionY, enemy.positionX];
              tileLeft = [nextTile[0], nextTile[1] - 1];
              tileLeftFrame = screenBitmap[tileLeft[0]][tileLeft[1]];
              tileUp = [nextTile[0] - 1, nextTile[1]];
              tileUpFrame = screenBitmap[tileUp[0]][tileUp[1]];
              tileRight = [nextTile[0], nextTile[1] + 1];
              tileRightFrame = screenBitmap[tileRight[0]][tileRight[1]];
              //tileDown
              //tileDownFrame = ghosts never volumtarily reverse direction

              // calculate distances between target and potential next tiles
              if (tileLeftFrame != WALL_FRAME) {
                tileLeftDistance = parseFloat(
                  distanceFromTarget(enemy, tileLeft).toPrecision(4)
                );
              }
              if (tileUpFrame != WALL_FRAME) {
                tileUpDistance = parseFloat(
                  distanceFromTarget(enemy, tileUp).toPrecision(4)
                );
              }
              if (tileRightFrame != WALL_FRAME) {
                tileRightDistance = parseFloat(
                  distanceFromTarget(enemy, tileRight).toPrecision(4)
                );
              }

              // determine the best direction
              // dossier: To break the tie, the ghost prefers directions in this order: up, left, down, right
              if (
                tileUpDistance <= tileRightDistance &&
                tileUpDistance <= tileLeftDistance
              ) {
                enemy.nextDirection = "up";
              } else if (
                tileLeftDistance <= tileUpDistance &&
                tileLeftDistance <= tileRightDistance
              ) {
                enemy.nextDirection = "left";
              } else if (
                tileRightDistance <= tileLeftDistance &&
                tileRightDistance <= tileUpDistance
              ) {
                enemy.nextDirection = "right";
              }
              // console.log(
              //   "enemy.up, position: ",
              //   enemy.positionX,
              //   ",",
              //   enemy.positionY,
              //   "nextTile: ",
              //   nextTile,
              //   "; nextDirection: ",
              //   enemy.nextDirection,
              //   "; tLtFrm: ",
              //   tileLeftFrame,
              //   "; tLtDist: ",
              //   tileLeftDistance,
              //   "; tUpFrm: ",
              //   tileUpFrame,
              //   "; tUpDist: ",
              //   tileUpDistance,
              //   "; tRtFrm: ",
              //   tileRightFrame,
              //   "; tRtDist: ",
              //   tileRightDistance
              // );
              break;

            case "right":
              nextTile = [enemy.positionY, enemy.positionX];
              //tileLeft
              //tileLeftFrame = ghosts never volumtarily reverse direction
              tileUp = [nextTile[0] - 1, nextTile[1]];
              tileUpFrame = screenBitmap[tileUp[0]][tileUp[1]];
              tileRight = [nextTile[0], nextTile[1] + 1];
              tileRightFrame = screenBitmap[tileRight[0]][tileRight[1]];
              tileDown = [nextTile[0] + 1, nextTile[1]];
              tileDownFrame = screenBitmap[tileDown[0]][tileDown[1]];

              // calculate distances between target and potential next tiles
              if (tileUpFrame != WALL_FRAME) {
                tileUpDistance = parseFloat(
                  distanceFromTarget(enemy, tileUp).toPrecision(4)
                );
              }
              if (tileRightFrame != WALL_FRAME) {
                tileRightDistance = parseFloat(
                  distanceFromTarget(enemy, tileRight).toPrecision(4)
                );
              }
              if (tileDownFrame != WALL_FRAME) {
                tileDownDistance = parseFloat(
                  distanceFromTarget(enemy, tileDown).toPrecision(4)
                );
              }

              // determine the best direction
              // dossier: To break the tie, the ghost prefers directions in this order: up, left, down, right
              if (
                tileUpDistance <= tileRightDistance &&
                tileUpDistance <= tileDownDistance
              ) {
                enemy.nextDirection = "up";
              } else if (
                tileDownDistance <= tileUpDistance &&
                tileDownDistance <= tileRightDistance
              ) {
                enemy.nextDirection = "down";
              } else if (
                tileRightDistance <= tileDownDistance &&
                tileRightDistance <= tileUpDistance
              ) {
                enemy.nextDirection = "right";
              }
              // console.log(
              //   "enemy.right, position: ",
              //   enemy.positionX,
              //   ",",
              //   enemy.positionY,
              //   "nextTile: ",
              //   nextTile,
              //   "; nextDirection: ",
              //   enemy.nextDirection,
              //   "; tUpFrm: ",
              //   tileUpFrame,
              //   "; tUpDist: ",
              //   tileUpDistance,
              //   "; tRtFrm: ",
              //   tileRightFrame,
              //   "; tRtDist: ",
              //   tileRightDistance,
              //   "; tDnFrm: ",
              //   tileDownFrame,
              //   "; tDnDist: ",
              //   tileDownDistance
              // );
              break;

            case "down":
              nextTile = [enemy.positionY, enemy.positionX];
              tileLeft = [nextTile[0], nextTile[1] - 1];
              tileLeftFrame = screenBitmap[tileLeft[0]][tileLeft[1]];
              //tileUp
              //tileUpFrame = ghosts never volumtarily reverse direction
              tileRight = [nextTile[0], nextTile[1] + 1];
              tileRightFrame = screenBitmap[tileRight[0]][tileRight[1]];
              tileDown = [nextTile[0] + 1, nextTile[1]];
              tileDownFrame = screenBitmap[tileDown[0]][tileDown[1]];

              // calculate distances between target and potential next tiles
              if (tileLeftFrame != WALL_FRAME) {
                tileLeftDistance = parseFloat(
                  distanceFromTarget(enemy, tileLeft).toPrecision(4)
                );
              }
              if (tileRightFrame != WALL_FRAME) {
                tileRightDistance = parseFloat(
                  distanceFromTarget(enemy, tileRight).toPrecision(4)
                );
              }
              if (tileDownFrame != WALL_FRAME) {
                tileDownDistance = parseFloat(
                  distanceFromTarget(enemy, tileDown).toPrecision(4)
                );
              }

              // determine the best direction
              // dossier: To break the tie, the ghost prefers directions in this order: up, left, down, right
              if (
                tileLeftDistance <= tileRightDistance &&
                tileLeftDistance <= tileDownDistance
              ) {
                enemy.nextDirection = "left";
              } else if (
                tileDownDistance <= tileLeftDistance &&
                tileDownDistance <= tileRightDistance
              ) {
                enemy.nextDirection = "down";
              } else if (
                tileRightDistance <= tileDownDistance &&
                tileRightDistance <= tileLeftDistance
              ) {
                enemy.nextDirection = "right";
              }

              // console.log(
              //   "enemy.down, position: ",
              //   enemy.positionX,
              //   ",",
              //   enemy.positionY,
              //   "nextTile: ",
              //   nextTile,
              //   "; nextDirection: ",
              //   enemy.nextDirection,
              //   "; tLtFrm: ",
              //   tileLeftFrame,
              //   "; tLtDist: ",
              //   tileLeftDistance,
              //   "; tRtFrm: ",
              //   tileRightFrame,
              //   "; tRtDist: ",
              //   tileRightDistance,
              //   "; tDnFrm: ",
              //   tileDownFrame,
              //   "; tDnDist: ",
              //   tileDownDistance
              // );
              break;

            default:
              break;
          }

          break;

        case ENEMY_MODE_CHASE:
          switch (enemy.whichWay) {
            case "left":
              break;
            case "right":
              break;
            case "up":
              break;
            case "down":
              break;

            default:
              break;
          }

          break;

        case ENEMY_MODE_FRIGHTENED:
          switch (enemy.whichWay) {
            case "left":
              break;
            case "right":
              break;
            case "up":
              break;
            case "down":
              break;

            default:
              break;
          }

          break;

        default:
          break;
      }
      break;

    case ENEMY_INDEX_CLYDE:
      switch (gameGlobals.enemyMode) {
        case ENEMY_MODE_SCATTER:
          enemy.targetTileX = 0;
          enemy.targetTileY = 73;

          switch (enemy.whichWay) {
            case "left":
              nextTile = [enemy.positionY, enemy.positionX];
              tileLeft = [nextTile[0], nextTile[1] - 1];
              tileLeftFrame = screenBitmap[tileLeft[0]][tileLeft[1]];
              tileUp = [nextTile[0] - 1, nextTile[1]];
              tileUpFrame = screenBitmap[tileUp[0]][tileUp[1]];
              //tileRight
              //tileRightFrame = ghosts never volumtarily reverse direction
              tileDown = [nextTile[0] + 1, nextTile[1]];
              tileDownFrame = screenBitmap[tileDown[0]][tileDown[1]];

              // calculate distances between target and potential next tiles
              if (tileLeftFrame != WALL_FRAME) {
                tileLeftDistance = parseFloat(
                  distanceFromTarget(enemy, tileLeft).toPrecision(4)
                );
              }
              if (tileUpFrame != WALL_FRAME) {
                tileUpDistance = parseFloat(
                  distanceFromTarget(enemy, tileUp).toPrecision(4)
                );
              }
              if (tileDownFrame != WALL_FRAME) {
                tileDownDistance = parseFloat(
                  distanceFromTarget(enemy, tileDown).toPrecision(4)
                );
              }

              // determine the best direction
              // dossier: To break the tie, the ghost prefers directions in this order: up, left, down, right
              if (
                tileUpDistance <= tileDownDistance &&
                tileUpDistance <= tileLeftDistance
              ) {
                enemy.nextDirection = "up";
              } else if (
                tileLeftDistance <= tileUpDistance &&
                tileLeftDistance <= tileDownDistance
              ) {
                enemy.nextDirection = "left";
              } else if (
                tileDownDistance <= tileLeftDistance &&
                tileDownDistance <= tileUpDistance
              ) {
                enemy.nextDirection = "down";
              }
              // console.log(
              //   "enemy.left, position: ",
              //   enemy.positionX,
              //   ",",
              //   enemy.positionY,
              //   "nextTile: ",
              //   nextTile,
              //   "; nextDirection: ",
              //   enemy.nextDirection,
              //   "; tLtFrm: ",
              //   tileLeftFrame,
              //   "; tLtDist: ",
              //   tileLeftDistance,
              //   "; tUpFrm: ",
              //   tileUpFrame,
              //   "; tUpDist: ",
              //   tileUpDistance,
              //   "; tDnFrm: ",
              //   tileDownFrame,
              //   "; tDnDist: ",
              //   tileDownDistance
              // );
              break;

            case "up":
              nextTile = [enemy.positionY, enemy.positionX];
              tileLeft = [nextTile[0], nextTile[1] - 1];
              tileLeftFrame = screenBitmap[tileLeft[0]][tileLeft[1]];
              tileUp = [nextTile[0] - 1, nextTile[1]];
              tileUpFrame = screenBitmap[tileUp[0]][tileUp[1]];
              tileRight = [nextTile[0], nextTile[1] + 1];
              tileRightFrame = screenBitmap[tileRight[0]][tileRight[1]];
              //tileDown
              //tileDownFrame = ghosts never volumtarily reverse direction

              // calculate distances between target and potential next tiles
              if (tileLeftFrame != WALL_FRAME) {
                tileLeftDistance = parseFloat(
                  distanceFromTarget(enemy, tileLeft).toPrecision(4)
                );
              }
              if (tileUpFrame != WALL_FRAME) {
                tileUpDistance = parseFloat(
                  distanceFromTarget(enemy, tileUp).toPrecision(4)
                );
              }
              if (tileRightFrame != WALL_FRAME) {
                tileRightDistance = parseFloat(
                  distanceFromTarget(enemy, tileRight).toPrecision(4)
                );
              }

              // determine the best direction
              // dossier: To break the tie, the ghost prefers directions in this order: up, left, down, right
              if (
                tileUpDistance <= tileRightDistance &&
                tileUpDistance <= tileLeftDistance
              ) {
                enemy.nextDirection = "up";
              } else if (
                tileLeftDistance <= tileUpDistance &&
                tileLeftDistance <= tileRightDistance
              ) {
                enemy.nextDirection = "left";
              } else if (
                tileRightDistance <= tileLeftDistance &&
                tileRightDistance <= tileUpDistance
              ) {
                enemy.nextDirection = "right";
              }
              // console.log(
              //   "enemy.up, position: ",
              //   enemy.positionX,
              //   ",",
              //   enemy.positionY,
              //   "nextTile: ",
              //   nextTile,
              //   "; nextDirection: ",
              //   enemy.nextDirection,
              //   "; tLtFrm: ",
              //   tileLeftFrame,
              //   "; tLtDist: ",
              //   tileLeftDistance,
              //   "; tUpFrm: ",
              //   tileUpFrame,
              //   "; tUpDist: ",
              //   tileUpDistance,
              //   "; tRtFrm: ",
              //   tileRightFrame,
              //   "; tRtDist: ",
              //   tileRightDistance
              // );
              break;

            case "right":
              nextTile = [enemy.positionY, enemy.positionX];
              //tileLeft
              //tileLeftFrame = ghosts never volumtarily reverse direction
              tileUp = [nextTile[0] - 1, nextTile[1]];
              tileUpFrame = screenBitmap[tileUp[0]][tileUp[1]];
              tileRight = [nextTile[0], nextTile[1] + 1];
              tileRightFrame = screenBitmap[tileRight[0]][tileRight[1]];
              tileDown = [nextTile[0] + 1, nextTile[1]];
              tileDownFrame = screenBitmap[tileDown[0]][tileDown[1]];

              // calculate distances between target and potential next tiles
              if (tileUpFrame != WALL_FRAME) {
                tileUpDistance = parseFloat(
                  distanceFromTarget(enemy, tileUp).toPrecision(4)
                );
              }
              if (tileRightFrame != WALL_FRAME) {
                tileRightDistance = parseFloat(
                  distanceFromTarget(enemy, tileRight).toPrecision(4)
                );
              }
              if (tileDownFrame != WALL_FRAME) {
                tileDownDistance = parseFloat(
                  distanceFromTarget(enemy, tileDown).toPrecision(4)
                );
              }

              // determine the best direction
              // dossier: To break the tie, the ghost prefers directions in this order: up, left, down, right
              if (
                tileUpDistance <= tileRightDistance &&
                tileUpDistance <= tileDownDistance
              ) {
                enemy.nextDirection = "up";
              } else if (
                tileDownDistance <= tileUpDistance &&
                tileDownDistance <= tileRightDistance
              ) {
                enemy.nextDirection = "down";
              } else if (
                tileRightDistance <= tileDownDistance &&
                tileRightDistance <= tileUpDistance
              ) {
                enemy.nextDirection = "right";
              }
              // console.log(
              //   "enemy.right, position: ",
              //   enemy.positionX,
              //   ",",
              //   enemy.positionY,
              //   "nextTile: ",
              //   nextTile,
              //   "; nextDirection: ",
              //   enemy.nextDirection,
              //   "; tUpFrm: ",
              //   tileUpFrame,
              //   "; tUpDist: ",
              //   tileUpDistance,
              //   "; tRtFrm: ",
              //   tileRightFrame,
              //   "; tRtDist: ",
              //   tileRightDistance,
              //   "; tDnFrm: ",
              //   tileDownFrame,
              //   "; tDnDist: ",
              //   tileDownDistance
              // );
              break;

            case "down":
              nextTile = [enemy.positionY, enemy.positionX];
              tileLeft = [nextTile[0], nextTile[1] - 1];
              tileLeftFrame = screenBitmap[tileLeft[0]][tileLeft[1]];
              //tileUp
              //tileUpFrame = ghosts never volumtarily reverse direction
              tileRight = [nextTile[0], nextTile[1] + 1];
              tileRightFrame = screenBitmap[tileRight[0]][tileRight[1]];
              tileDown = [nextTile[0] + 1, nextTile[1]];
              tileDownFrame = screenBitmap[tileDown[0]][tileDown[1]];

              // calculate distances between target and potential next tiles
              if (tileLeftFrame != WALL_FRAME) {
                tileLeftDistance = parseFloat(
                  distanceFromTarget(enemy, tileLeft).toPrecision(4)
                );
              }
              if (tileRightFrame != WALL_FRAME) {
                tileRightDistance = parseFloat(
                  distanceFromTarget(enemy, tileRight).toPrecision(4)
                );
              }
              if (tileDownFrame != WALL_FRAME) {
                tileDownDistance = parseFloat(
                  distanceFromTarget(enemy, tileDown).toPrecision(4)
                );
              }

              // determine the best direction
              // dossier: To break the tie, the ghost prefers directions in this order: up, left, down, right
              if (
                tileLeftDistance <= tileRightDistance &&
                tileLeftDistance <= tileDownDistance
              ) {
                enemy.nextDirection = "left";
              } else if (
                tileDownDistance <= tileLeftDistance &&
                tileDownDistance <= tileRightDistance
              ) {
                enemy.nextDirection = "down";
              } else if (
                tileRightDistance <= tileDownDistance &&
                tileRightDistance <= tileLeftDistance
              ) {
                enemy.nextDirection = "right";
              }

              // console.log(
              //   "enemy.down, position: ",
              //   enemy.positionX,
              //   ",",
              //   enemy.positionY,
              //   "nextTile: ",
              //   nextTile,
              //   "; nextDirection: ",
              //   enemy.nextDirection,
              //   "; tLtFrm: ",
              //   tileLeftFrame,
              //   "; tLtDist: ",
              //   tileLeftDistance,
              //   "; tRtFrm: ",
              //   tileRightFrame,
              //   "; tRtDist: ",
              //   tileRightDistance,
              //   "; tDnFrm: ",
              //   tileDownFrame,
              //   "; tDnDist: ",
              //   tileDownDistance
              // );
              break;

            default:
              break;
          }

          break;

        case ENEMY_MODE_CHASE:
          switch (enemy.whichWay) {
            case "left":
              break;
            case "right":
              break;
            case "up":
              break;
            case "down":
              break;

            default:
              break;
          }

          break;

        case ENEMY_MODE_FRIGHTENED:
          break;

        default:
          break;
      }
      break;

    default:
      break;
  }
}

function enemiesUpdate() {
  for (let index = 0; index < enemies.length; index++) {
    const enemy = enemies[index];
    // update previousPositions
    enemy.previousPositionX = enemy.positionX;
    enemy.previousPositionY = enemy.positionY;
    if (enemy.moving) {
      // move enemy in the pre-determined (from last frame) direction
      switch (enemy.nextDirection) {
        case "left":
          enemy.whichWay = "left";
          enemy.positionX -= 1;
          break;

        case "right":
          enemy.whichWay = "right";
          enemy.positionX += 1;
          break;

        case "up":
          enemy.whichWay = "up";
          enemy.positionY -= 1;
          break;

        case "down":
          enemy.whichWay = "down";
          enemy.positionY += 1;
          break;

        default:
          FileMaker.PerformScriptWithOption(
            "Console ( data ) 2",
            "Error for enemyMoving; default case - nextDirection:" +
              enemy.nextDirection,
            0
          );
      } // switch

      // player collision test
      if (
        player.positionX == enemy.positionX &&
        player.positionY == enemy.positionY
      ) {
        player.dying = true;
        player.lives -= 1;
        player.frameNo = 0;
        player.moving = false;
        for (let index = 0; index < enemies.length; index++) {
          enemies[index].moving = false;
        }
      }

      // pre-determine next direction using dossier A.I.
      enemiesNextMoveUsingDossierAI(enemy, index);
    }
  }
}

// - - - MAIN GAME LOOP - - -

function gameLoop() {
  // move sprites and update screenBitmap
  enemiesUpdate();
  playerUpdate();
  screenBitmapUpdate();

  // handle extra life
  if (!gameGlobals.extraLife && player.score > EXTRA_LIFE_SCORE) {
    gameGlobals.extraLife = true;
    player.lives += 1;
  }

  // handle pellet count - converted to simpler count to save possibly expensive process
  //     ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat
  //     ref: https://linuxhint.com/count-certain-elements-in-array-in-javascript/
  gameGlobals.levelPelletCount = screenBitmap
    .flat()
    .reduce(
      (count, value) => (value == 30 || value == 31 ? count + 1 : count),
      0
    );

  // handle fruit
  if (
    !gameGlobals.firstFruitFlag &&
    gameGlobals.levelPelletCount < PELLET_COUNT - 70
  ) {
    gameGlobals.firstFruitFlag = true;
    gameGlobals.fruitTimer = FRUIT_TIMER;
    addFruit();
  } else if (
    !gameGlobals.secondFruitFlag &&
    gameGlobals.levelPelletCount < PELLET_COUNT - 170
  ) {
    gameGlobals.secondFruitFlag = true;
    gameGlobals.fruitTimer = FRUIT_TIMER;
    addFruit();
  }
  //
  if (gameGlobals.fruitTimer > 0) {
    gameGlobals.fruitTimer -= 1;
    if (gameGlobals.fruitTimer == 0) {
      removeFruit();
    }
  }
  //
  if (gameGlobals.fruitScoreTimer > 0) {
    gameGlobals.fruitScoreTimer -= 1;
    if (gameGlobals.fruitScoreTimer == 0) {
      player.fruitScore = "";
    }
  }

  // handle blinkTimer
  if (gameGlobals.preparingTimer == 0) {
    if (gameGlobals.blinkTimer > 0) {
      gameGlobals.blinkTimer -= 1;
      if (gameGlobals.blinkTimer == 0) {
        // reset timer
        gameGlobals.blinkTimer = BLINK_TIMER;
        // select blink frame
        if (gameGlobals.blinkFrame == ENERGIZER_FRAME) {
          gameGlobals.blinkFrame = ENERGIZERALT_FRAME;
        } else {
          gameGlobals.blinkFrame = ENERGIZER_FRAME;
        }
        // energizers
        if (screenBitmap[56][2] != EMPTY_FRAME) {
          screenBitmap[56][2] = gameGlobals.blinkFrame;
        }
        if (screenBitmap[56][63] != EMPTY_FRAME) {
          screenBitmap[56][63] = gameGlobals.blinkFrame;
        }
        if (screenBitmap[6][2] != EMPTY_FRAME) {
          screenBitmap[6][2] = gameGlobals.blinkFrame;
        }
        if (screenBitmap[6][63] != EMPTY_FRAME) {
          screenBitmap[6][63] = gameGlobals.blinkFrame;
        }
      }
    }
  }

  // handle frightenedTimer
  if (gameGlobals.frightenedTimer > 0) {
    gameGlobals.frightenedTimer -= 1;
    if (gameGlobals.frightenedTimer == 0) {
      for (let index = 0; index < enemies.length; index++) {
        enemies[index].frightened = false;
      }
    }
  }

  // handle level completed
  if (
    gameGlobals.levelCompletedTimer == 0 &&
    gameGlobals.levelPreparingTimer == 0 &&
    gameGlobals.levelPelletCount < 1
  ) {
    levelCompletion();
  }

  // handle preparingForPlay
  if (gameGlobals.preparingTimer > 0) {
    gameGlobals.preparingTimer -= 1;
    if (gameGlobals.preparingTimer == 0) {
      startPlay();
    } else if (gameGlobals.preparingTimer == PREPARING_HALFTIMER) {
      setToPlay();
    }
  }

  // handle level completed
  if (gameGlobals.levelCompletedTimer > 0) {
    gameGlobals.levelCompletedTimer -= 1;
    //
    if (gameGlobals.levelCompletedTimer == 0) {
      gameGlobals.levelPreparingTimer = LEVELPREPARING_TIMER;
      // enable erasing sprite from current location
      player.previousPositionX = player.positionX;
      player.previousPositionY = player.positionY;
      player.positionX = 0;
      player.positionY = 0;
      // timer completion
      prepareLevel();
      screenBitmapInitialRefresh();
      //
    } else if (gameGlobals.levelCompletedTimer % 3 == 0) {
      // toggle backdrop via script
      FileMaker.PerformScriptWithOption("BackdropAlternateToggle 2", "", 0);
    }
  }

  // handle level preparation
  if (gameGlobals.levelPreparingTimer > 0) {
    // enable erasing sprite from current location (prevents last pellet from being lost)
    player.previousPositionX = player.positionX;
    player.previousPositionY = player.positionY;

    gameGlobals.levelPreparingTimer -= 1;
    if (gameGlobals.levelPreparingTimer == 0) {
      prepareForPlay();
    }
  }

  // render everything
  updateFMP();
}
