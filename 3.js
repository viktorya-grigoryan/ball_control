// 02.js

"use strict";

const circle = function (ctx, x, у, radius, fillCircle) {
 ctx.beginPath();
 ctx.arc (x, у, radius, 0, Math.PI * 2, false);
 if (fillCircle)
   ctx.fill();
 else
   ctx.stroke();
};

const colors = ["Red", "Orange", "Yellow", "Green", "Indigo", 
"Pink", "Black", "Violet", "Blue"];

function getRandom (min, max){
  return Math.floor(Math.random()*(max - min + 1))+min;
 }

class Ball {
  constructor(ctx, width, height, x, y) {
    this.x = x ;
    this.y = y ;
    this.xSpeed = 2;
    this.ySpeed = 0;
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.speed = 2;
    this.radius = 10
    this.color = getRandom(0, 9);
  }
  draw() {
    this.ctx.fillStyle = colors[this.color];
    circle(this.ctx, this.x, this.y, this.radius, true);
  }
  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if (this.x < 0) {
      this.xSpeed *=(-1);
    } else if (this.x > this.width) {
      this.xSpeed *=(-1);
    } 
    if (this.y < 0) {
      this.ySpeed *=(-1);
    } else if (this.y > this.height) {
      this.ySpeed *=(-1);
    }
  }



  //*Настройка движения шарика
  set(code){
    if (code<58 && code > 48  || code == 90 || code == 88){
      if (code==90){ //замедление Z
        if(this.speed>0)
          this.speed -=1;
      }
      else if(code==88){ // ускорение X
        this.speed+=1;
      }
      else{ //задание определенной скорости 1..9
        this.speed = code - 48;
      }
      if (this.xSpeed > 0){
        this.xSpeed = this.speed;
      }
      else if(this.xSpeed < 0){
        this.xSpeed = (-1)*this.speed;
      }
      else if (this.ySpeed > 0){
        this.ySpeed = this.speed;
      }
      else if (this.ySpeed<0){
        this.ySpeed = (-1)*this.speed;
      }
      else{
      this.xSpeed = this.speed;
      }
    }
    else if (code==37){  //влево  
      this.xSpeed = (-1)*this.speed;
      this.ySpeed = 0;
    }
    else if (code==38){   //вверх
      this.xSpeed = 0;
      this.ySpeed = (-1)*this.speed;
    }
    else if(code == 39){   //вправо
      this.xSpeed = this.speed;
      this.ySpeed = 0;
    }
    else if (code == 40){  //вниз
      this.xSpeed = 0;
      this.ySpeed = this.speed;
    }
    else if (code==32){  //остановка (пробел)
      this.xSpeed=0;
      this.ySpeed=0;
    }
    else if(code==86){  // увеличить шарик  V
      this.radius+=1;
    }
    else if (code == 67 && this.radius>1){  //уменьшить шарик C
      this.radius-=1;
    }
  }

}


function main() {
  // Retrieve <canvas> element
    const canvas = document.getElementById('mycanvas');
    const ctx = canvas.getContext("2d") ;
    const rect = canvas.getBoundingClientRect();
    const width = canvas.width;
    const height = canvas.height ;

    const balls = [];

    const ball = new Ball(ctx, width, height, width/2, height/2);
    balls.push(ball);

    function divert(event) {
      for (let i=0; i<balls.length; i++){
        balls[i].set(event.keyCode);
      }
    }
    function onClick(event){
      let x = event.clientX;
      let y = event.clientY;
      x-=rect.left;
      y-=rect.top;
      const ball = new Ball(ctx,width, height, x, y);
      balls.push(ball);
    }
      
    window.addEventListener("keydown", divert);
    window.addEventListener("click", onClick);  

    function animate( ) {
      ctx.clearRect(0, 0, width, height);
      for(let i=0; i<balls.length; i++){
        balls[i].draw();
        balls[i].move();
      }
      //balls[0].move();
	  requestAnimationFrame(animate);
	}
	
	animate();
}