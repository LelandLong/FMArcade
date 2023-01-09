// MarioBros
//    v1.0

// - - - MULTI-DIMENSIONAL ARRAY UTILTY - - -
//
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

// - - - VARIABLE DECLARATIONS - - -

// Global vars
var gameGlobals = {
  loopIndex: 0,
  timerDuration: 70,
  levelIndex: 1,
  levelActive: true,
};

// screen bitmap
const columns = 65;
const rows = 75;
var screenBitmap = powerArray(columns, rows);
for (let column = 0; column < columns; column++) {
  for (let row = 0; row < rows; row++) {
    screenBitmap[column][row] = 0;
  }
}

// physics aliases
var Engine = Matter.Engine,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite;

// create a physics engine with canvas size
var engine = Engine.create({
  render: {
    options: {
      width: 65,
      height: 75,
    },
  },
});

// change gravity
engine.gravity.scale = 0.00005;

// the static ground rectangle
var ground = Bodies.rectangle(32, 80, 66, 10, { isStatic: true });

// add ground body to the world
Composite.add(engine.world, [ground]);

// players; start with a simgle sprite
var players = [];
var spriteBody = [];
const newPlayer = createNewPlayer();
players.push(newPlayer);

// create physics runner
var runner = Runner.create();

// run the physics engine
Runner.run(runner, engine);

// - - - USER INPUT - - -

function keyRouting(whichKey, keyCode) {
  switch (whichKey) {
    // Mac - A key
    case "KeyA":
      // player.lastKey = "up";
      const newPlayer = createNewPlayer();
      players.push(newPlayer);
      break;

    // Mac - Z key
    case "KeyZ":
      // player.lastKey = "down";
      break;

    // Mac - comma key
    case "Comma":
      // player.lastKey = "left";
      break;

    // Mac - period key
    case "Period":
      // player.lastKey = "right";
      break;

    // Mac - Q key
    case "KeyQ":
      clearTimeout(gameTimer);
      clearInterval(gameTimer);
      FileMaker.PerformScript("Game_Quit 3", "");
      break;

    default:
      switch (keyCode) {
        // Windows - A key
        case 65:
          players.lastKey = "up";
          break;

        // Windows - Z key
        case 90:
          players.lastKey = "down";
          break;

        // Windows - comma key
        case 188:
          players.lastKey = "left";
          break;

        // Windows - period key
        case 190:
          players.lastKey = "right";
          break;

        // Windows - Q key
        case 81:
          clearTimeout(gameTimer);
          clearInterval(gameTimer);
          FileMaker.PerformScript("Game_Quit", "");
          break;

        default:
      }
  }
}

// - - - PLAYER - - -

function createNewPlayer() {
  const playerCount = players.length;
  const newX = Math.floor(Math.random() * 73) + 4;
  var newPlayer = {
    positionX: newX,
    positionY: 1,
    previousPositionX: 0,
    previousPositionY: 0,
    frameNo: 1,
  };
  var newSpriteBody = Bodies.rectangle(
    newPlayer.positionX,
    newPlayer.positionY,
    5,
    5,
    { restitution: 0.8 }
  );
  spriteBody.push(newSpriteBody);
  Composite.add(engine.world, [newSpriteBody]);
  return newPlayer;
}

function playerMoving(playerIndex) {
  players[playerIndex].previousPositionX = players[playerIndex].positionX;
  players[playerIndex].previousPositionY = players[playerIndex].positionY;

  // 4 animations frames while moving
  players[playerIndex].frameNo += 1;
  if (players[playerIndex].frameNo > 4) {
    players[playerIndex].frameNo = 1;
  }
  // X coords
  players[playerIndex].positionX = Math.trunc(
    spriteBody[playerIndex].position.x
  );
  // Y coords
  players[playerIndex].positionY = Math.trunc(
    spriteBody[playerIndex].position.y
  );
  //
  // if position falls outside canvas bounds, just ignore and dont draw
  var outOfBoundsFlag = false;
  if (
    players[playerIndex].positionX < 1 ||
    players[playerIndex].positionX > 65 ||
    players[playerIndex].positionY < 1 ||
    players[playerIndex].positionY > 75
  ) {
    outOfBoundsFlag = true;
  } else {
    //
    // remove previous sprite position from bitmap
    screenBitmap[players[playerIndex].previousPositionX][
      players[playerIndex].previousPositionY
    ] = 0;
    //
    // add new sprite position to bitmap
    screenBitmap[players[playerIndex].positionX][
      players[playerIndex].positionY
    ] = players[playerIndex].frameNo;
    //
  }
}

// - - - GAME INIT - - -

// start up the Main Loop
var gameTimer = setInterval(gameLoop, gameGlobals.timerDuration);

// - - - WEBVIEWER / DOCUMENT - - -

// Global / Document - events
$(document).ready(function () {
  // initial values
  // FileMaker.PerformScript(
  //   "Console ( data ) 3",
  //   "screenBitmap: " + JSON.stringify(screenBitmap)
  // );
});

// keydown event in window
$(document).keydown(function (e) {
  var keys = new Object();
  keys.whichKey = e.code;
  keys.keyCode = e.keyCode;
  FileMaker.PerformScript("Keyboard ( data ) 3", JSON.stringify(keys));
  keyRouting(keys.whichKey, keys.keyCode);
});
$(document).keyup(function (e) {
  var keys = new Object();
  keys.whichKey = " ";
  FileMaker.PerformScript("Keyboard ( data ) 3", JSON.stringify(keys));
});

// - - - MAIN GAME LOOP - - -

function gameLoop() {
  gameGlobals.loopIndex += 1;

  // level not yet completed
  if (gameGlobals.levelActive == true) {
    // loop thru all player sprites and update positions via physics engine
    for (let index = 0; index < players.length; index++) {
      playerMoving(index);
    }
    // prepare FMP parameter
    const params = {
      players: players,
      screenBitmap: screenBitmap,
    };
    // send FMP all the newest sprite data for rendering
    FileMaker.PerformScriptWithOption(
      "PlayersUpdate ( players )",
      JSON.stringify(params),
      0
    );
  }
}
