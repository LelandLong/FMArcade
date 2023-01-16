// MarioBros
//    v1.0

// - - - PHYSICS VALUES - - -

const WORLD_GRAVITY = 0.00005;
const PLAYER_INIT_X = 38;
const PLAYER_INIT_Y = 1;
const PLAYER_RUN_VELOCITY_X = 0.25;
const PLAYER_JUMP_VELOCITY_Y = 0.65;
const PLAYER_SLIDE_NORMAL_FRAMECOUNT = 4;
const PLAYER_SLIDE_ICE_FRAMECOUNT = 10;
const PLAYER_BODY_RESTITUTION = 0;
const PLAYER_BODY_FRICTION = 0;
const PLAYER_BODY_FRICTIONAIR = 0;
const PLAYER_BODY_DENSITY = 0.5;
const FLOOR_FRICTIONSTATIC = 5;

// - - - ENCODED SOUNDS (merged in from FMP) - - -

const audioRunning = "**AUDIO_RUNNING**";
const audioSliding = "**AUDIO_SLIDING**";
const audioJumping = "**AUDIO_JUMPING**";

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
const columns = 66;
const rows = 76;
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
engine.gravity.scale = WORLD_GRAVITY;

// the static rectangles
var ground = Bodies.rectangle(32, 80, 66, 10, {
  isStatic: true,
  frictionStatic: FLOOR_FRICTIONSTATIC,
});
var leftBar = Bodies.rectangle(11, 64, 20, 1, {
  isStatic: true,
  frictionStatic: FLOOR_FRICTIONSTATIC,
});
var rightBar = Bodies.rectangle(55, 64, 20, 1, {
  isStatic: true,
  frictionStatic: FLOOR_FRICTIONSTATIC,
});
var powBar = Bodies.rectangle(33, 64, 3, 2, {
  isStatic: true,
  frictionStatic: FLOOR_FRICTIONSTATIC,
});

// add bodies to the world
Composite.add(engine.world, [ground, leftBar, rightBar, powBar]);

// player sprite
var players = [];
const newPlayer = createNewPlayer();
players.push(newPlayer);

// create physics runner
var runner = Runner.create();

// run the physics engine
Runner.run(runner, engine);

// - - - USER INPUT - - -

function keyRouting(whichKey, keyCode) {
  var playerIndex = 0;

  switch (whichKey) {
    // Mac - A key
    case "KeyA":
      break;

    // Mac - Z key
    case "KeyZ":
      break;

    // Mac - space key
    case "Space":
      playerIndex = 0;
      changePlayerMovement(playerIndex, "jump");
      break;

    // Mac - comma key
    case "Comma":
      playerIndex = 0;
      changePlayerMovement(playerIndex, "left");
      break;

    // Mac - period key
    case "Period":
      playerIndex = 0;
      changePlayerMovement(playerIndex, "right");
      break;

    // Mac - Q key
    case "KeyQ":
      gameQuit();
      break;

    default:
      switch (keyCode) {
        // Windows - A key
        case 65:
          break;

        // Windows - Z key
        case 90:
          break;

        // Windows - comma key
        case 188:
          playerIndex = 0;
          changePlayerMovement(playerIndex, "left");
          break;

        // Windows - period key
        case 190:
          playerIndex = 0;
          changePlayerMovement(playerIndex, "right");
          break;

        // Windows - Q key
        case 81:
          gameQuit();
          break;

        default:
      }
  }
}

// - - - PLAYER - - -

// init new player sprite & body
function createNewPlayer() {
  var newPlayer = {
    positionX: PLAYER_INIT_X,
    positionY: PLAYER_INIT_Y,
    previousPositionX: 0,
    previousPositionY: 0,
    previousVelocityY: 0,
    frameNo: 5,
    direction: "left",
    spriteBody: "",
  };
  var newSpriteBody = Bodies.rectangle(PLAYER_INIT_X, PLAYER_INIT_Y, 5, 5, {
    restitution: PLAYER_BODY_RESTITUTION,
    friction: PLAYER_BODY_FRICTION,
    frictionAir: PLAYER_BODY_FRICTIONAIR,
    density: PLAYER_BODY_DENSITY,
  });
  newPlayer.spriteBody = newSpriteBody;
  Composite.add(engine.world, [newPlayer.spriteBody]);
  return newPlayer;
}

// handle player movement
function playerMoving(playerIndex) {
  // update previous position
  players[playerIndex].previousPositionX = players[playerIndex].positionX;
  players[playerIndex].previousPositionY = players[playerIndex].positionY;

  // sliding handler
  if (players[playerIndex].slideCount > 0) {
    // decrement slide counter if sliding
    players[playerIndex].slideCount -= 1;

    // test end of sliding
    if (players[playerIndex].slideCount == 0) {
      // begin standing still
      if (players[playerIndex].direction == "slideleft") {
        players[playerIndex].direction = "left";
        players[playerIndex].frameNo = 5;
      } else if (players[playerIndex].direction == "slideright") {
        players[playerIndex].direction = "right";
        players[playerIndex].frameNo = 15;
      }
      Matter.Body.setVelocity(players[playerIndex].spriteBody, {
        x: 0,
        y: 0,
      });
      //
    }
  }

  // animations frames left (1, 2, 3, 4)
  if (
    players[playerIndex].direction == "left" &&
    players[playerIndex].frameNo < 4
  ) {
    players[playerIndex].frameNo += 1;
  } else if (
    players[playerIndex].direction == "left" &&
    players[playerIndex].frameNo == 4
  ) {
    players[playerIndex].frameNo = 1;
  }
  // animations frames right (11, 12, 13, 14)
  if (
    players[playerIndex].direction == "right" &&
    players[playerIndex].frameNo < 14
  ) {
    players[playerIndex].frameNo += 1;
  } else if (
    players[playerIndex].direction == "right" &&
    players[playerIndex].frameNo == 14
  ) {
    players[playerIndex].frameNo = 11;
  }
  //
  // get new X coords from physics engine
  players[playerIndex].positionX = Math.trunc(
    players[playerIndex].spriteBody.position.x
  );
  // get new Y coords from physics engine
  players[playerIndex].positionY = Math.trunc(
    players[playerIndex].spriteBody.position.y
  );
  //

  // wrap-around when crossing either side
  if (players[playerIndex].positionX < 1) {
    Matter.Body.set(players[playerIndex].spriteBody, "position", {
      x: 65,
      y: players[playerIndex].positionY,
    });
    players[playerIndex].positionX = 65;
    players[playerIndex].previousPositionX = 1;
  }
  if (players[playerIndex].positionX > 65) {
    Matter.Body.set(players[playerIndex].spriteBody, "position", {
      x: 1,
      y: players[playerIndex].positionY,
    });
    players[playerIndex].positionX = 1;
    players[playerIndex].previousPositionX = 65;
  }
  //
  // remove previous sprite position from bitmap
  if (
    players[playerIndex].previousPositionX > 0 &&
    players[playerIndex].previousPositionX < 66 &&
    players[playerIndex].previousPositionY > 0 &&
    players[playerIndex].previousPositionY < 76
  ) {
    screenBitmap[players[playerIndex].previousPositionX][
      players[playerIndex].previousPositionY
    ] = 0;
  }
  //
  // add new sprite position to bitmap
  if (
    players[playerIndex].positionX > 0 &&
    players[playerIndex].positionX < 66 &&
    players[playerIndex].positionY > 0 &&
    players[playerIndex].positionY < 76
  ) {
    screenBitmap[players[playerIndex].positionX][
      players[playerIndex].positionY
    ] = players[playerIndex].frameNo;
  }
}

// key pressed - player is changing it's movement
function changePlayerMovement(playerIndex, newDirection) {
  if (newDirection == "right") {
    if (
      players[playerIndex].direction == "left" &&
      players[playerIndex].frameNo != 5
    ) {
      // begin sliding left
      players[playerIndex].direction = "slideleft";
      players[playerIndex].slideCount = PLAYER_SLIDE_NORMAL_FRAMECOUNT;
      players[playerIndex].frameNo = 6;
      const sound_sliding = new Audio("data:audio/mp4;base64," + audioSliding);
      sound_sliding.play();
      //
    } else if (players[playerIndex].direction == "slideleft") {
      // sliding to stop so do nothing
      //
    } else if (
      players[playerIndex].direction == "right" &&
      players[playerIndex].frameNo != 5
    ) {
      // already moving right so do nothing
      //
    } else {
      // begin moving right
      players[playerIndex].direction = "right";
      players[playerIndex].frameNo = 11;
      Matter.Body.setVelocity(players[playerIndex].spriteBody, {
        x: PLAYER_RUN_VELOCITY_X,
        y: 0,
      });
      const sound_running = new Audio("data:audio/mp4;base64," + audioRunning);
      sound_running.play();
    }
  }
  //
  if (newDirection == "left") {
    if (
      players[playerIndex].direction == "right" &&
      players[playerIndex].frameNo != 15
    ) {
      // begin sliding right
      players[playerIndex].direction = "slideright";
      players[playerIndex].slideCount = PLAYER_SLIDE_NORMAL_FRAMECOUNT;
      players[playerIndex].frameNo = 16;
      const sound_sliding = new Audio("data:audio/mp4;base64," + audioSliding);
      sound_sliding.play();
      //
    } else if (players[playerIndex].direction == "slideright") {
      // sliding to stop so do nothing
      //
    } else if (
      players[playerIndex].direction == "left" &&
      players[playerIndex].frameNo != 5
    ) {
      // already moving right so do nothing
      //
    } else {
      // begin moving left
      players[playerIndex].direction = "left";
      players[playerIndex].frameNo = 1;
      Matter.Body.setVelocity(players[playerIndex].spriteBody, {
        x: 0 - PLAYER_RUN_VELOCITY_X,
        y: 0,
      });
      const sound_running = new Audio("data:audio/mp4;base64," + audioRunning);
      sound_running.play();
    }
  }
  //
  if (newDirection == "jump") {
    Matter.Body.setVelocity(players[playerIndex].spriteBody, {
      x: players[playerIndex].spriteBody.velocity.x,
      y: 0 - PLAYER_JUMP_VELOCITY_Y,
    });
    const sound_jumping = new Audio("data:audio/mp4;base64," + audioJumping);
    sound_jumping.play();
  }
}

// - - - GAME INIT - - -

// start up the Main Loop
var gameTimer = setInterval(gameLoop, gameGlobals.timerDuration);

// - - - WEBVIEWER / DOCUMENT - - -

// Global / Document - events
$(document).ready(function () {
  // initial values
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
      players: [
        {
          positionX: players[0].positionX,
          positionY: players[0].positionY,
          previousPositionX: players[0].previousPositionX,
          previousPositionY: players[0].previousPositionY,
        },
      ],
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

// - - - EXIT GAME LOOP / QUIT - - -

function gameQuit() {
  clearTimeout(gameTimer);
  clearInterval(gameTimer);
  $(document).off("keydown");
  $(document).off("keyup");
  FileMaker.PerformScript("Game_Quit 3", "");
}
