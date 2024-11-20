class Brick extends Sprite {
  constructor(x, y, width, height, resistance = 1) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.resistance = resistance; 
  }

  update() {
    return this.resistance <= 0;
  }

  draw(ctx) {
    if (this.resistance > 0) {
      // Change color based on resistance level
      if (this.resistance === 3) ctx.fillStyle = "red";
      else if (this.resistance === 2) ctx.fillStyle = "orange";
      else if (this.resistance === 1) ctx.fillStyle = "yellow";

      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }

  checkCollision(ball) {
    if (
      this.resistance > 0 &&
      ball.x + ball.radius > this.x &&
      ball.x - ball.radius < this.x + this.width &&
      ball.y + ball.radius > this.y &&
      ball.y - ball.radius < this.y + this.height
    ) {
      this.resistance -= 1; // Decrease resistance on hit

      // Determine collision side
      const overlapLeft = ball.x + ball.radius - this.x;
      const overlapRight = this.x + this.width - (ball.x - ball.radius);
      const overlapTop = ball.y + ball.radius - this.y;
      const overlapBottom = this.y + this.height - (ball.y - ball.radius);

      
      const minOverlap = Math.min(
        overlapLeft,
        overlapRight,
        overlapTop,
        overlapBottom
      );

      if (minOverlap === overlapLeft || minOverlap === overlapRight) {
        ball.dx *= -1; // Horizontal collision
      } else if (minOverlap === overlapTop || minOverlap === overlapBottom) {
        ball.dy *= -1; // Vertical collision
      }
    }
  }
}
