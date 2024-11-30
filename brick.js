class Brick extends Sprite {
  constructor(x, y, width, height, resistance, level) {
      super();
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.resistance = resistance;
      this.level = level; // Reference to the Level instance
  }

  update() {
      return this.resistance <= 0;
  }

  draw(ctx) {
      if (this.resistance > 0) {
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
          this.resistance -= 1;

          // Notify the Level instance when a brick is destroyed
          if (this.resistance <= 0) {
              this.level.score.increment(); // Increment the score
              this.level.brickDestroyed(); // Notify the level

              // Spawn power-ups
              if (this.level.powerUpsActivated && Math.random() < 0.3) {
                  const powerUp = new PowerUp(
                      this.x + this.width / 2,
                      this.y,
                      "multi-ball", // Example power-up type
                      this.level // Pass the level reference to the PowerUp
                  );
                  this.level.game.addSprite(powerUp);
              }
          }

          // Reverse ball direction
          ball.dy *= -1;
      }
  }
}
