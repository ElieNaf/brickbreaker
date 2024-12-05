class Level {
    constructor(levelNumber, rows, cols, resistanceRange, game, ball, score, lives) {
        this.levelNumber = levelNumber;
        this.rows = rows;
        this.cols = cols;
        this.resistanceRange = resistanceRange;
        this.game = game;
        this.ball = ball;
        this.score = score;
        this.lives = lives;
        this.brokenBricksCount = 0; // Count of fully destroyed bricks
        this.totalBricks = 0; // Total bricks count
        this.powerUpsActivated = levelNumber > 1;

        this.generateBricks();
    }

    generateBricks() {
        this.totalBricks = 0; // Reset brick count
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                const resistance = Math.floor(Math.random() * this.resistanceRange) + 1;
                const brick = new Brick(
                    65 * j,
                    30 * i + 40,
                    60,
                    20,
                    resistance,
                    this
                );
                this.game.addSprite(brick);
                this.totalBricks++; // Increment total brick count
            }
        }
    }

    resetLevel() {
        // Reset ball position and velocity
        this.ball.x = 400;
        this.ball.y = 300;
        this.ball.dx = 4;
        this.ball.dy = -5;

        // Reset score and broken bricks count
        this.score.score = 0;
        this.brokenBricksCount = 0;

        // Regenerate bricks
        this.generateBricks();
    }

    brickDestroyed() {
        this.brokenBricksCount++;

        // Check if all bricks are destroyed
        if (this.brokenBricksCount === this.totalBricks) {
            if (this.levelNumber === 2) {
                console.log("Level 2 completed! Restarting game...");
                this.game.restart = true; // Set the restart flag
                return;
            }

            // Transition to the next level
            const nextLevelNumber = this.levelNumber + 1;
            const nextLevelConfig = this.getLevelConfig(nextLevelNumber);
            if (nextLevelConfig.rows > 0) {
                const nextLevel = new Level(
                    nextLevelNumber,
                    nextLevelConfig.rows,
                    nextLevelConfig.cols,
                    nextLevelConfig.resistanceRange,
                    this.game,
                    this.ball,
                    this.score,
                    this.lives
                );
                this.game.currentLevel = nextLevel;
                nextLevel.resetLevel();
            } else {
                console.log("No more levels.");
                this.game.paused = true; // End the game
            }
        }
    }

    getLevelConfig(levelNumber) {
        const configs = {
            1: { rows: 5, cols: 10, resistanceRange: 3 },
            2: { rows: 7, cols: 12, resistanceRange: 4 },
        };
        return configs[levelNumber] || { rows: 0, cols: 0, resistanceRange: 0 };
    }
}
