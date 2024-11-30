class Score extends Sprite {
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.score = 0;
    }

    increment() {
        this.score++;
    }

    draw(ctx) {
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText(`Score: ${this.score}`, this.x, this.y);
    }
}
