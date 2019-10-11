var gameport = document.getElementById("gameport");

var renderer = PIXI.autoDetectRenderer(1675, 500, {backgroundColor: 0x33cc33});
gameport.appendChild(renderer.view);

// creates containers
var stage = new PIXI.Container();
var race = new PIXI.Container();

// add background images
var mainMenu = new PIXI.Sprite(PIXI.Texture.fromImage("MainMenu.png"));
var raceTrack = new PIXI.Sprite(PIXI.Texture.fromImage("racetrack.png"));
var credits = new PIXI.Sprite(PIXI.Texture.fromImage("credits.png"));
var instructions = new PIXI.Sprite(PIXI.Texture.fromImage("howto.png"));

// adds game elements
var firefighter = new PIXI.Sprite(PIXI.Texture.fromImage("firefighter.png"));

// adds button elements
var playBtn = new PIXI.Sprite(PIXI.Texture.fromImage("playBtn.png"));
var instructionBtn = new PIXI.Sprite(PIXI.Texture.fromImage("htpBtn.png"));
var creditBtn = new PIXI.Sprite(PIXI.Texture.fromImage("creditsBtn.png"));
var backBtn = new PIXI.Sprite(PIXI.Texture.fromImage("returnBtn.png"));

// sets position of game elements
playBtn.position.x = 25;
playBtn.position.y = 425;
instructionBtn.position.x = 200;
instructionBtn.position.y = 425;
creditBtn.position.x = 375;
creditBtn.position.y = 425;

// adds main menu elements to the stage container
stage.addChild(mainMenu);
stage.addChild(playBtn);
stage.addChild(instructionBtn);
stage.addChild(creditBtn);

// adds gameplay elements to race container
race.addChild(raceTrack);
race.addChild(firefighter);

// Sets buttons to interactive
playBtn.interactive = true;
instructionBtn.interactive = true;
creditBtn.interactive = true;
backBtn.interactive = true;

// assigns hander functions to button
playBtn.on('mousedown', playHandler);
instructionBtn.on('mousedown', instructionHandler);
creditBtn.on('mousedown', creditsHandler);
backBtn.on('mousedown', menuReturn);

// starts game
function playHandler(e)
{
  // removes main menu elements
  stage.removeChild(mainMenu);
  stage.removeChild(playBtn);
  stage.removeChild(instructionBtn);
  stage.removeChild(creditBtn);

  // adds play elements
  stage.addChild(race);

  // Accesses sprite files
  PIXI.loader
    .add("assets.json")
    .load(ready);

  // Play background music
  PIXI.sound.Sound.from({
      url: 'music.mp3',
      autoPlay: true,
      loop: true,
      complete: function() {
          console.log('Sound finished');
      }
    })
}

function ready()
{

  firefighter.position.y = 300; // sets firefighter position
  firefighter.interactive = true; // makes object interactive
  firefighter.on('mousedown', mouseHandler);

  var standing = new PIXI.Sprite(PIXI.Texture.fromFrame("runner1.png"));
  standing.scale.x = 1;
  standing.scale.y = 1;
  standing.position.x = 50;
  standing.position.y = 200;
  race.addChild(standing);

  // creates array
  var frames = [];

  // adds images of runner to frame array
  var sheet = PIXI.Loader.shared.resources["assets.json"].spritesheet;
  var person = new PIXI.AnimatedSprite(sheet.animations["runner"]);

  // creates movie clip and runs through array
  person = new PIXI.extras.MovieClip(frames);
  person.scale.x = 1;
  person.scale.y = 1;
  person.position.x = 200;
  person.position.y = 200;
  person.animationSpeed = 0.1;
  person.play();
  race.addChild(person); // adds runner to race container
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
  backBtn.position.x = 375;
  backBtn.position.y = 425;
}

// returns main menu elements to stage
function menuReturn(e)
{
  stage.addChild(mainMenu);
  stage.addChild(playBtn);
  stage.addChild(instructionBtn);
  stage.addChild(creditBtn);
  stage.removeChild(credits);
  stage.removeChild(instructions);
  stage.removeChild(backBtn);
}

function mouseHandler(e) {
  var new_x = firefighter.position.x +=10;
  createjs.Tween.get(hero.position).to({x: new_x}, 1000, createjs.Ease.bounceOut);
}

function keydownEventHandler(e)
{
  if (e.keyCode == 13) // Enter key
  {
    standing.position.x += 10; // moves standing man horizontally across screen
  }
}

document.addEventListener('keydown', keydownEventHandler);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(stage);
}
animate();
