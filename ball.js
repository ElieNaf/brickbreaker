
class Ball extends Sprite {
    constructor(x, y, radius) {
      super();
      this.startX = x; 
      this.startY = y;
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.dx = 4;
      this.dy = -4; 
    }
  
    reset() {
      this.x = 400; 
      this.y = 300; 
      this.dx = Math.random() * 8 - 4;
      if (Math.abs(this.dx) < 1) {
        this.dx = this.dx < 0 ? -2 : 2; 
      }
      this.dy = -4; 
    }
  
    update(sprites) {
      this.x += this.dx;
      this.y += this.dy;
  
      // Bounce off walls
      if (this.x - this.radius < 0 || this.x + this.radius > 800) {
          this.dx *= -1;
      }
      if (this.y - this.radius < 0) {
          this.dy *= -1;
      }
  
      // Check paddle collision
      const paddle = sprites.find((sprite) => sprite instanceof Paddle);
      if (
          paddle &&
          this.x > paddle.x &&
          this.x < paddle.x + paddle.width &&
          this.y + this.radius > paddle.y
      ) {
          this.dy *= -1; 
      }
  
      sprites.forEach((sprite) => {
          if (sprite instanceof Brick) {
              sprite.checkCollision(this);
          }
      });
  
      
      if (this.y - this.radius > 550) {
          this.reset(); 
      }
  
      return false; 
  }
  
    draw(ctx) {
      ctx.fillStyle = "green";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  