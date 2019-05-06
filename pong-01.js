var WIDTH = 600,
    HEIGHT = 400;

function makeScore(WIDTH, HEIGHT){
  this.ctx = null;

  this.score1 = 0;
  this.score2 = 0;

  this.width = WIDTH;
  this.height = HEIGHT;

  this.init =  function(ctx){
    this.reset();
    this.ctx = ctx;
  };

  this.draw = function (){
    this.ctx.font = "70px Courier New";
    this.ctx.fillStyle = 'white';

    this.ctx.fillText(this.score1, 240,60 );

    this.ctx.fillText(this.score2, 320,60 );

    //--Divide el campo en dos
    var i = 0;
    while (i < this.height){
      this.ctx.fillStyle = 'white';
      this.ctx.fillRect(300, i, 1, 10)
      i += 15;
    }
  };

  this.reset = function(){
    this.score1 = 0;
    this.score2 = 0;
  }
}

function Palas(x,y){

  this.x_ini = x;
  this.y_ini = y;

  this.width = 10;
  this.height = 40;

  this.x =  0;
  this.y = 0;

  this.vy = 0;

  this.ctx = null;

  this.init = function(ctx) {
    this.ctx = ctx;
    this.reset();
  };
  this.draw = function () {
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(this.x, this.y, this.width, this.height)
  };
  this.update = function() {

    this.y += this.vy*this.speed;
    if (this.y > HEIGHT - this.height){
      this.y = HEIGHT - this.height;
    } else if (this.y < 0){
      this.y = 0;
    }
  };

  this.reset = function() {
    this.x = this.x_ini;
    this.y = this.y_ini;
  };
}

function Bola() {

  this.x_ini = 85;
  this.y_ini = 125;

  this.x = 0;
  this.y = 0;

  this.width = 5;
  this.height = 5;

  this.vx = 5;
  this.vy = 2;
  this.speed = 1; //-- Dificultad: EASY, NORMAL, HARD

  this.ctx = null;

  this.reset = function() {
    this.x = this.x_ini;
    this.y = this.y_ini;
  };

  this.init = function(ctx){
    this.reset();
    this.ctx = ctx;
  };

  this.draw = function () {
    this.ctx.fillStyle = 'white';
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI);
    this.ctx.fill()
  };

  this.update = function () {
    this.x += this.vx*this.speed;
    this.y += this.vy*this.speed;

    if (this.y > HEIGHT - this.height || this.y < this.height){
      this.vy = -this.vy;
    }
  };
}

function moverPalas(pala1, pala2){
    window.onkeydown = (p) => {
        p.preventDefault();
        switch (p.key) {
            case 'w':
                pala1.vy = -1;
                break;
            case 's':
                pala1.vy = 1;
                break;
            case 'ArrowUp':
                pala2.vy = -1;
                break;
            case 'ArrowDown':
                pala2.vy = 1;
                break;
            default:
                break;
        }
    };
    window.onkeyup = (p) => {
        p.preventDefault();
        switch (p.key) {
            case 'w':
                pala1.vy = 0;
                break;
            case 's':
                pala1.vy = 0;
                break;
            case 'ArrowUp':
                pala2.vy = 0;
                break;
            case 'ArrowDown':
                pala2.vy = 0;
                break;
            default:
                break;
        }
    };
}

function rebote(pala1, pala2, bola){
  if (bola.x <= (pala1.x + pala1.width) && bola.x >= pala1.x) {
    if (bola.y >= pala1.y && bola.y <= (pala1.y + pala1.height)){
      bola.vx = -bola.vx;
    }
  };

  if ((bola.x + bola.width) >= pala2.x && (bola.x+ bola.width) <= (pala2.x + pala2.width)){
    if ((bola.y + bola.height) <= (pala2.y + pala2.height) && (bola.y + bola.height) >= pala2.y){
      bola.vx = -bola.vx;
    }
  };
}

function restartBola(player, bola, pala1, pala2){

  if (player == 'Jugador1'){
    bola.x_ini = 550;
    bola.y_ini = 200;

  } else if (player == 'Jugador2'){
    bola.x_ini = 50;
    bola.y_ini = 100;
  };

  bola.reset();
  pala1.reset();
  pala2.reset();
  bola.draw();
  pala1.draw();
  pala2.draw();
}

function Dificultad(bola, pala1, pala2){
  var dif = document.querySelector('input[name="dif"]:checked').value;

  switch (dif) {
    case 'easy':
        bola.speed = 1;
        pala1.speed = 4;
        pala2.speed = 4;
        break;
    case 'normal':
        bola.speed = 1.5;
        pala1.speed = 6;
        pala2.speed = 6;
        break;
    case 'hard':
        bola.speed = 2;
        pala1.speed = 8;
        pala2.speed = 8;
        break;
    default:
        break;
  }
}

function main(){

  var canvas = document.getElementById('display')
  canvas.width = WIDTH;
  canvas.height = HEIGHT;

  var ctx = canvas.getContext("2d");

  var score = new makeScore(canvas.width, canvas.height);

  score.init(ctx);
  score.draw();

  var pala1 = new Palas(50, 100, canvas.height);
  var pala2 = new Palas(550, 200, canvas.height);

  pala1.init(ctx);
  pala1.draw();

  pala2.init(ctx);
  pala2.draw();

  var bola = new Bola();

  bola.init(ctx);
  bola.draw();


  var timer = null;
  var start = document.getElementById('start');

  //-- Programa principal
  start.onclick = () => {

    var points = document.querySelector('input[name="points"]:checked').value;

    if (!timer){
      timer = setInterval(() =>{

        Dificultad(bola, pala1, pala2);


        pala1.update();
        pala2.update();
        bola.update();

        ctx.clearRect(0,0,canvas.width, canvas.height);

        bola.draw();
        pala1.draw();
        pala2.draw();
        score.draw();

        moverPalas(pala1, pala2);
        rebote(pala1, pala2, bola);

        if (bola.x > canvas.width - bola.width){
          score.score1++;
          //-- Saque Jugador2:
          restartBola('Jugador1', bola, pala1, pala2);

          bola.vx = -bola.vx;

        } else if (bola.x < bola.width){
          score.score2++;
          //-- Saque Jugador1:
          restartBola('Jugador2', bola, pala1, pala2);

          bola.vx = -bola.vx;
        }


        if (score.score1 == points || score.score2 == points){

          clearInterval(timer);
          timer = null;

          ctx.clearRect(0,0,canvas.width, canvas.height);

          bola.reset();
          pala1.reset();
          pala2.reset();
          score.reset();

          bola.draw();
          pala1.draw();
          pala2.draw();
          score.draw();
        }
      }, 20);
    }
  }
}
