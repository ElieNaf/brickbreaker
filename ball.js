class Ball extends Sprite {
    constructor(x, y, radius) {
        super();
        this.startX = x;
        this.startY = y;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dx = 8;
        this.dy = -10;
        this.speedBoosted = false; // Tracks if ball speed is boosted
        this.remainingFrames = 0; // Frames remaining for the power-up effect
    }

    reset() {
        // Decrement lives if the Lives instance exists
        if (Lives.instance) {
            Lives.instance.decrement();
        }

        // Reset ball position and speed
        this.x = 400;
        this.y = 300;
        this.dx = Math.random() * 10 - 4;
        if (Math.abs(this.dx) < 1) {
            this.dx = this.dx < 0 ? -2 : 2;
        }
        this.dy = -8;
        this.speedBoosted = false; // Reset speed boost
        this.remainingFrames = 0; // Reset power-up timer
    }

    update(sprites) {
        // Update position
        this.x += this.dx;
        this.y += this.dy;

        // Handle power-up effect duration
        if (this.remainingFrames > 0) {
            this.remainingFrames--;
            if (this.remainingFrames === 0) {
                // Revert ball speed when the power-up effect ends
                if (this.speedBoosted) {
                    this.dx /= 1.5;
                    this.dy /= 1.5;
                    this.speedBoosted = false;
                }
            }
        }

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

            // Play ballHit sound
            const ballHitSound = sprites.find(
                (sprite) => sprite instanceof Sound && sprite.audio.src.includes("ballHit")
            );
            if (ballHitSound) {
                ballHitSound.audio.currentTime = 0; // Reset sound
                ballHitSound.audio.play();
            }
        }

        // Check brick collisions
        sprites.forEach((sprite) => {
            if (sprite instanceof Brick) {
                sprite.checkCollision(this);

                // Play ballHit sound if the brick is hit
                if (
                    sprite.resistance > 0 && // Brick is still active
                    this.x + this.radius > sprite.x &&
                    this.x - this.radius < sprite.x + sprite.width &&
                    this.y + this.radius > sprite.y &&
                    this.y - this.radius < sprite.y + sprite.height
                ) {
                    const ballHitSound = sprites.find(
                        (sprite) => sprite instanceof Sound && sprite.audio.src.includes("ballHit")
                    );
                    if (ballHitSound) {
                        ballHitSound.audio.currentTime = 0; // Reset sound
                        ballHitSound.audio.play();
                    }
                }
            }
        });

        // If the ball goes below the paddle, reset it
        if (this.y - this.radius > 550) {
            this.reset();
        }

        return false;
    }

    applySpeedBoost(durationFrames) {
        if (!this.speedBoosted) {
            this.dx *= 1.5; // Increase ball speed in x-direction
            this.dy *= 1.5; // Increase ball speed in y-direction
            this.speedBoosted = true;
            this.remainingFrames = durationFrames; // Set duration for the speed boost
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.speedBoosted ? "red" : "green"; // Change color when speed-boosted
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}
