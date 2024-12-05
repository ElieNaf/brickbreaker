class Paddle extends Sprite {
    constructor(x, y, width, height) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = 10;
        this.expanded = false; // Tracks if the paddle is expanded
        this.boosted = false; // Tracks if the paddle's speed is boosted
        this.remainingFrames = 0; // Frames remaining for power-up effects
    }

    update(sprites, keys) {
        // Handle power-up effect duration
        if (this.remainingFrames > 0) {
            this.remainingFrames--;
            if (this.remainingFrames === 0) {
                // Revert paddle size and speed after the effect ends
                if (this.expanded) {
                    this.width -= 50;
                    this.expanded = false;
                }
                if (this.boosted) {
                    this.speed -= 3;
                    this.boosted = false;
                }
            }
        }

        // Movement controls
        if (keys['ArrowLeft'] && this.x > 0) {
            this.x -= this.speed;
        }
        if (keys['ArrowRight'] && this.x + this.width < 800) {
            this.x += this.speed;
        }

        return false; 
    }

    applyExpand(durationFrames) {
        if (!this.expanded) {
            this.width += 50; // Expand the paddle width
            this.expanded = true;
            this.remainingFrames = durationFrames; // Set duration for the expansion
        }
    }

    applySpeedBoost(durationFrames) {
        if (!this.boosted) {
            this.speed += 3; // Increase paddle speed
            this.boosted = true;
            this.remainingFrames = durationFrames; // Set duration for the speed boost
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.expanded ? "purple" : "blue"; // Change color if expanded
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
