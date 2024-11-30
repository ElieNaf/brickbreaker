class Lives extends Sprite {
    constructor(x, y, initialLives = 3) {
        super();
        this.x = x;
        this.y = y;
        this.lives = initialLives;
        Lives.instance = this; // Set the static instance reference
    }

    decrement() {
        if (this.lives > 0) {
            this.lives--;
        }
    }

    draw(ctx) {
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText(`Lives: ${this.lives}`, this.x, this.y);
    }
}
