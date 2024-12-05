class PowerUp extends Sprite {
    constructor(x, y, type, level) {
        super();
        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 20;
        this.speed = 3;
        this.type = type; // Define power-up type (e.g., 'paddle-expand', 'speed-boost', 'ball-speed')
        this.level = level; // Reference to the level instance
        this.duration = 300; // Effect duration in frames (5 seconds at 60 FPS)
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
        const paddle = sprites.find(sprite => sprite instanceof Paddle);
        const ball = sprites.find(sprite => sprite instanceof Ball);

        switch (this.type) {
            case 'paddle-expand':
                if (paddle && !paddle.expanded) {
                    paddle.expanded = true; // Track effect to prevent stacking
                    paddle.width += 50;
                    paddle.remainingFrames = this.duration;
                }
                break;

            case 'speed-boost':
                if (paddle && !paddle.boosted) {
                    paddle.boosted = true; // Track effect to prevent stacking
                    paddle.speed += 3;
                    paddle.remainingFrames = this.duration;
                }
                break;

            case 'ball-speed':
                if (ball && !ball.speedBoosted) {
                    ball.speedBoosted = true; // Track effect to prevent stacking
                    ball.dx *= 1.5;
                    ball.dy *= 1.5;
                    ball.remainingFrames = this.duration;
                }
                break;

            default:
                console.warn(`Unknown power-up type: ${this.type}`);
        }
    }

    draw(ctx) {
        let color;
        switch (this.type) {
            case 'paddle-expand':
                color = 'blue';
                break;
            case 'speed-boost':
                color = 'green';
                break;
            case 'ball-speed':
                color = 'red';
                break;
            default:
                color = 'gold';
        }
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
