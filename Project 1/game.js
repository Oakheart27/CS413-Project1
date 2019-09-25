var gameport = document.getElementById("gameport");

var renderer = PIXI.autoDetectRenderer(500, 500, {backgroundColor: 0x33cc33});
gameport.appendChild(renderer.view);

var stage = new PIXI.Container();

var background = new PIXI.Sprite(PIXI.Texture.fromImage("background.png"));
stage.addChild(background);
var score = 0;
var scoreoutput = new PIXI.Text("Fires destroyed: 0");
stage.addChild(scoreoutput);
var endtext = new PIXI.Text("Good job. You saved the forest");

var firefighter = new PIXI.Sprite(PIXI.Texture.fromImage("firefighter.png"));
var fire = new PIXI.Sprite(PIXI.Texture.fromImage("fire.png"));
var gameover = new PIXI.Sprite(PIXI.Texture.fromImage("gameOver.png"));

//firefighter.health = 100;

firefighter.position.x = 100;
firefighter.position.y = 100;

fire.position.x = 50;
fire.position.y = 50;

stage.addChild(firefighter);
stage.addChild(fire);

function keydownEventHandler(e) {

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

  if (e.keyCode == 13 && firefighter.position.x < fire.position.x + 50 &&
  firefighter.position.x > fire.position.x - 50 && firefighter.position.y
  < fire.position.y + 50 && firefighter.position.y > fire.position.y - 50)
  {
    fire.position.x = Math.floor(Math.random() * 300) + 50;
    fire.position.y = Math.floor(Math.random() * 300) + 50;
    score++;
    scoreoutput.text = "Fires destroyed: " + score;

    if (score == 5)
    {
      stage.removeChild(fire);
      stage.removeChild(firefighter);
      stage.removeChild(scoreoutput); 
      gameover.position.x = 200;
      gameover.position.y = 200;
      stage.addChild(gameover);
      stage.addChild(endtext);
      endtext.position.x = 100;
      endtext.posision.y = 150;
    }
  }
}

document.addEventListener('keydown', keydownEventHandler);


function animate() {
  requestAnimationFrame(animate);
  renderer.render(stage);
}
animate();
