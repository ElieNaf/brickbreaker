class Level {
    constructor(levelNumber, rows, cols, resistanceRange, game, ball, score, lives) {
        this.levelNumber = levelNumber; // Current level number
        this.rows = rows; // Number of brick rows
        this.cols = cols; // Number of brick columns
        this.resistanceRange = resistanceRange; // Range for brick resistance
        this.game = game; // Reference to the game instance
        this.ball = ball; // Reference to the ball
        this.score = score; // Reference to the score
        this.lives = lives; // Reference to the lives
        this.brokenBricksCount = 0; // Count of broken bricks
        this.totalBricks = rows * cols; // Total bricks in this level
        this.powerUpsActivated = levelNumber > 1; // Activate power-ups after Level 1
    }

    generateBricks() {
        // Generate the bricks for this level
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                const resistance = Math.floor(Math.random() * this.resistanceRange) + 1;
                const brick = new Brick(
                    65 * j, 30 * i + 40, 60, 20, resistance, this // Pass Level reference to Brick
                );
                this.game.addSprite(brick);
            }
        }
    }

    resetLevel() {
        // Reset the ball's position and velocity
        this.ball.x = 400;
        this.ball.y = 300;
        this.ball.dx = 4;
        this.ball.dy = -5;

        // Reset the score for the level
        this.score.score = 0;

        // Reset broken bricks count
        this.brokenBricksCount = 0;

        // Generate the bricks for the new level
        this.generateBricks();
    }

    brickDestroyed() {
        this.brokenBricksCount++;
        this.score.increment(); // Increment score when a brick is destroyed

        if (this.brokenBricksCount === this.totalBricks) {
            if (this.levelNumber === 2) {
                // End the game if Level 2 is completed
                alert("Game Over! You completed all levels!");
                this.game.paused = true;
                return;
            }

            // Transition to the next level
            const nextLevelNumber = this.levelNumber + 1;
            const nextLevelConfig = this.getLevelConfig(nextLevelNumber); // Get configuration for the next level
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
            nextLevel.resetLevel();
            this.game.currentLevel = nextLevel; // Update the game's current level
        }
    }

    getLevelConfig(levelNumber) {
        // Return level-specific configurations
        const configs = {
            1: { rows: 5, cols: 10, resistanceRange: 3 },
            2: { rows: 7, cols: 12, resistanceRange: 4 }
        };

        return configs[levelNumber] || { rows: 0, cols: 0, resistanceRange: 0 };
    }
}
