class StartScreen extends Sprite {
    constructor(game, ball, score, lives) {
        super();
        this.game = game;
        this.currentScreen = 'START'; // Possible states: START, INSTRUCTIONS, STORY
        this.isActive = true; // Determines if the StartScreen is active
        this.ball = ball;
        this.score = score;
        this.lives = lives;
    }

    update(sprites, keys) {
        if (!this.isActive) return false; // Do nothing if not active

        if (this.currentScreen === 'START') {
            if (keys[' ']) {
                // Start the game and deactivate StartScreen
                this.isActive = false;
                this.createFirstLevel();
                return true; // Remove the StartScreen from the game
            } else if (keys['i']) {
                this.currentScreen = 'INSTRUCTIONS';
            } else if (keys['s']) {
                this.currentScreen = 'STORY';
            }
        } else if (keys['b']) {
            // Go back to the main menu
            this.currentScreen = 'START';
        }
        return false; // Keep the StartScreen active
    }

    draw(ctx) {
        if (!this.isActive) return; // Do nothing if not active

        ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);

        ctx.fillStyle = "white";
        ctx.font = "30px Arial";
        ctx.textAlign = "center";

        if (this.currentScreen === 'START') {
            ctx.fillText("Welcome to the Game", this.game.canvas.width / 2, 100);
            ctx.fillText("Press SPACE to Start", this.game.canvas.width / 2, 200);
            ctx.fillText("Press I for Instructions", this.game.canvas.width / 2, 250);
            ctx.fillText("Press S for Story", this.game.canvas.width / 2, 300);
        } else if (this.currentScreen === 'INSTRUCTIONS') {
            ctx.fillText("Instructions", this.game.canvas.width / 2, 100);
            ctx.font = "20px Arial";
            ctx.fillText("- Use arrow keys to move the paddle.", this.game.canvas.width / 2, 200);
            ctx.fillText("- Break all the bricks to win!", this.game.canvas.width / 2, 250);
            ctx.fillText("Press B to go back.", this.game.canvas.width / 2, 300);
        } else if (this.currentScreen === 'STORY') {
            ctx.fillText("Story", this.game.canvas.width / 2, 100);
            ctx.font = "20px Arial";
            ctx.fillText("In a distant galaxy, a hero...", this.game.canvas.width / 2, 200);
            ctx.fillText("...must break barriers to save the universe.", this.game.canvas.width / 2, 250);
            ctx.fillText("Press B to go back.", this.game.canvas.width / 2, 300);
        }
    }

    createFirstLevel() {
        const firstLevel = new Level(
            2,
            5,
            10,
            3,
            this.game,
            this.ball,
            this.score,
            this.lives
        );
        this.game.currentLevel = firstLevel;
    }
}
