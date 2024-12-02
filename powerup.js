class PowerUp extends Sprite {
    static activePowerUp = null; // Tracks the currently active power-up
    static activePowerUpTimeout = null; // Timeout reference for clearing the active state

    constructor(x, y, type, level) {
        super();
        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 20;
        this.speed = 3;
        this.type = type; // Define power-up type (e.g., 'multi-ball', 'paddle-expand')
        this.level = level; // Reference to the level instance
    }

    update(sprites) {
        this.y += this.speed;

        const paddle = sprites.find(sprite => sprite instanceof Paddle);
        if (
            paddle &&
            this.x + this.width > paddle.x &&
            this.x < paddle.x + paddle.width &&
            this.y + this.height > paddle.y &&
            this.y < paddle.y + paddle.height
        ) {
            this.activate(sprites);
            return true; // Remove the power-up after activation
        }

        return this.y > 600; // Remove if it moves off-screen
    }

    activate(sprites) {
        if (PowerUp.activePowerUp) return; // Prevent activation if another power-up is active

        PowerUp.activePowerUp = this.type;

        // Handle the effect of the power-up
        if (this.type === 'multi-ball') {
            const ball = sprites.find(sprite => sprite instanceof Ball);
            if (ball) {
                for (let i = -1; i <= 1; i++) {
                    const newBall = new Ball(ball.x, ball.y, ball.radius);
                    newBall.dx = ball.dx + i;
                    newBall.dy = ball.dy;
                    this.level.game.addSprite(newBall); // Add the new ball to the game
                }
            }
        } else if (this.type === 'paddle-expand') {
            const paddle = sprites.find(sprite => sprite instanceof Paddle);
            if (paddle) {
                paddle.width += 50; // Increase paddle width
                setTimeout(() => {
                    paddle.width -= 50; // Revert paddle width after 5 seconds
                }, 5000);
            }
        }

        // Set a timeout to clear the active state after 5 seconds
        PowerUp.activePowerUpTimeout = setTimeout(() => {
            PowerUp.activePowerUp = null; // Allow new power-ups to spawn
        }, 5000); // Active duration: 5 seconds
    }

    draw(ctx) {
        ctx.fillStyle = "gold";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    static reset() {
        // Clear active power-up state and timeout
        PowerUp.activePowerUp = null;
        if (PowerUp.activePowerUpTimeout) {
            clearTimeout(PowerUp.activePowerUpTimeout);
            PowerUp.activePowerUpTimeout = null;
        }
    }
}
