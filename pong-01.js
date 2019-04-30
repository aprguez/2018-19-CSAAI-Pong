function main(){
  console.log("Pong: Main: Start!")

  var canvas = document.getElementById('display')
  canvas.width = 600;
  canvas.height = 400;

  var ctx = canvas.getContext("2d");

  var bola = {
    //-- Posición inicial de la pelota
    x_ini: 50,
    y_ini: 50,
    //-- Dimensiones de la Bola
    width: 5,
    height: 5,
    //-- Coornenadas
    x : 0,
    y : 0,
    //-- Velocidad
    vx : 4,
    vy : 1,
    //-- Contexto
    ctx: null,

  //-- Raquetas
  ctx.fillStyle = 'white';
  ctx.fillRect(50,100, 10, 40)


  //-- Inicializar la bola
    init: function(ctx) {
      this.ctx = ctx;
      this.reset();
    },

  //-- Reset: Set the ball to the initial state
    reset: function() {
      this.x = this.x_ini;
      this.y = this.y_ini;
    }

  // Dibujar la bola
      draw: function () {
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(this.x, this.y, this.width, this.height)
      },

  //-- Reset: Set the ball to the initial state
    reset: function() {
      this.x = this.x_ini;
      this.y = this.y_ini;
    }

}
