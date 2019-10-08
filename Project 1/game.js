var gameport = document.getElementById("gameport");

var renderer = PIXI.autoDetectRenderer(500, 500, {backgroundColor: 0x33cc33});
gameport.appendChild(renderer.view);

var stage = new PIXI.Container();

var background = new PIXI.Sprite(PIXI.Texture.fromImage("background.png"));

var score = 0; // initializes score to 0
var scoreoutput = new PIXI.Text("Fires destroyed: 0");
var endtext = new PIXI.Text("Good job. You saved the forest");

// adds game elements
var firefighter = new PIXI.Sprite(PIXI.Texture.fromImage("firefighter.png"));
var fire = new PIXI.Sprite(PIXI.Texture.fromImage("fire.png"));
var gameover = new PIXI.Sprite(PIXI.Texture.fromImage("gameOver.png"));

// sets firefighter and fire positions
firefighter.position.x = 100;
firefighter.position.y = 100;
fire.position.x = Math.floor(Math.random() * 300) + 50;
fire.position.y = Math.floor(Math.random() * 300) + 50;

// adds elements to stage 
stage.addChild(background);
stage.addChild(scoreoutput);
stage.addChild(firefighter);
stage.addChild(fire);

// Function to handle keyboard inputs
function keydownEventHandler(e) {

  // Used to move firefighter around stage
  if (e.keyCode == 87) { // W key
    firefighter.position.y -= 10;
  }

  if (e.keyCode == 83) { // S key
    firefighter.position.y += 10;
  }

  if (e.keyCode == 65) { // A key
    firefighter.position.x -= 10;
  }

  if (e.keyCode == 68) { // D key
    firefighter.position.x += 10;
  }

  // Checks if firefighter is on fire
  if (e.keyCode == 13 && firefighter.position.x < fire.position.x + 50 &&
  firefighter.position.x > fire.position.x - 50 && firefighter.position.y
  < fire.position.y + 50 && firefighter.position.y > fire.position.y - 50)
  {
    // randomly moves fire
    fire.position.x = Math.floor(Math.random() * 300) + 50;
    fire.position.y = Math.floor(Math.random() * 300) + 50;
    score++; // increments score
    scoreoutput.text = "Fires destroyed: " + score; // Displays new score to user

    // Checks if score equals 5
    if (score == 5)
    {
      // removes stage eleemtns
      stage.removeChild(fire);
      stage.removeChild(firefighter);
      stage.removeChild(scoreoutput);

      // addes end game elements and sets their position
      gameover.position.x = 200;
      gameover.position.y = 200;
      stage.addChild(gameover);
      stage.addChild(endtext);
      endtext.position.x = 50;
      endtext.position.y = 100;
    }
  }
}

document.addEventListener('keydown', keydownEventHandler);


function animate() {
  requestAnimationFrame(animate);
  renderer.render(stage);
}
animate();
