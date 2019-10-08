var gameport = document.getElementById("gameport");

var renderer = PIXI.autoDetectRenderer(1675, 500, {backgroundColor: 0x33cc33});
gameport.appendChild(renderer.view);

var stage = new PIXI.Container();

// add background images
var mainMenu = new PIXI.Sprite(PIXI.Texture.fromImage("MainMenu.png"));
var raceTrack = new PIXI.Sprite(PIXI.Texture.fromImage("racetrack.png"));
var credits = new PIXI.Sprite(PIXI.Texture.fromImage("credits.png"));

// adds game elements
var fire = new PIXI.Sprite(PIXI.Texture.fromImage("fire.png"));
var gameover = new PIXI.Sprite(PIXI.Texture.fromImage("gameOver.png"));
var instructions = new PIXI.Sprite(PIXI.Texture.fromImage("howto.png"));

// adds button elements
var playBtn = new PIXI.Sprite(PIXI.Texture.fromImage("playBtn.png"));
var instructionBtn = new PIXI.Sprite(PIXI.Texture.fromImage("htpBtn.png"));
var creditBtn = new PIXI.Sprite(PIXI.Texture.fromImage("creditsBtn.png"));
var backBtn = new PIXI.Sprite(PIXI.Texture.fromImage("returnBtn.png"));

// sets position of game elements
fire.position.x = 50;
fire.position.y = 50;
playBtn.position.x = 25;
playBtn.position.y = 425;
instructionBtn.position.x = 200;
instructionBtn.position.y = 425;
creditBtn.position.x = 375;
creditBtn.position.y = 425;

// adds main menu elements to the screen
stage.addChild(mainMenu);
stage.addChild(fire);
stage.addChild(playBtn);
stage.addChild(instructionBtn);
stage.addChild(creditBtn);

// Sets buttons to interactive
playBtn.interactive = true;
instructionBtn.interactive = true;
creditBtn.interactive = true;

// assigns hander functions to button
playBtn.on('mousedown', playHandler);
instructionBtn.on('mousedown', instructionHandler);
creditBtn.on('mousedown', creditsHandler);

// starts game
function playHandler(e)
{
  // removes main menu elements
  stage.removeChild(mainMenu);
  stage.removeChild(playBtn);
  stage.removeChild(instructionBtn);
  stage.removeChild(creditBtn);

  // adds play elements
  stage.addChild(raceTrack);
}

// displays how to play information
function instructionHandler(e)
{
  // removes main menu elements
  stage.removeChild(mainMenu);
  stage.removeChild(playBtn);
  stage.removeChild(instructionBtn);
  stage.removeChild(creditBtn);

  // displays game instructions
  stage.addChild(instructions);
  stage.addChild(backBtn);
  backBtn.position.x = 460;
  backBtn.position.y = 425;
}

// displays credit information
function creditsHandler(e)
{
  // removes main menu elements
  stage.removeChild(mainMenu);
  stage.removeChild(playBtn);
  stage.removeChild(instructionBtn);
  stage.removeChild(creditBtn);

  // displays credits for game development
  stage.addChild(credits);
  stage.addChild(backBtn);
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(stage);
}
animate();
