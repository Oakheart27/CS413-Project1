var gameport = document.getElementById("gameport");

var renderer = PIXI.autoDetectRenderer(400, 400, {backgroundColor: 0x33cc33});
gameport.appendChild(renderer.view);

var stage = new PIXI.Container();

var firefighter = new PIXI.Sprite(PIXI.Texture.fromImage("firefighter.png"));
var fire = new PIXI.Sprite(PIXI.Texture.fromImage("fire.png"));
var gameover = new PIXI.Sprite(PIXI.Texture.fromImage("gameOver.png"));

var score = 0;

firefighter.health = 100;

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

  if (e.keyCode == 32 && firefighter.position.x < fire.position.x + 50 &&
  firefighter.position.x > fire.position.x - 50 && firefighter.position.y
  < fire.position.y + 50 && firefighter.position.y > fire.position.y - 50)
  {
    fire.position.x = Math.floor(Math.random() * 300) + 50;
    fire.position.y = Math.floor(Math.random() * 300) + 50;
    score ++;

    if (score == 5)
    {
      stage.removeChild(fire);
      stage.removeChild(firefighter);
      stage.addChild(gameover);
    }
  }
}

document.addEventListener('keydown', keydownEventHandler);


function animate() {
  requestAnimationFrame(animate);
  renderer.render(stage);
}
animate();
