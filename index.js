const game = new Game();
var background = new Background("spaceBackground.jpg", 0);

game.addSprite(background);

const paddle = new Paddle(350, 550, 100, 20);
game.addSprite(paddle);

const ball = new Ball(400, 300, 10);
game.addSprite(ball);

const score = new Score(10, 20);
game.addSprite(score);

const lives = new Lives(700, 20);
game.addSprite(lives);

// Initialize the first level
const firstLevel = new Level(1, 5, 10, 3, game, ball, score, lives);
game.currentLevel = firstLevel;
firstLevel.generateBricks();

// Start the game
game.animate();
