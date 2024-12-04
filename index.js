const game = new Game();

const background = new Background("spaceBackground.jpg", 0);
game.addSprite(background);

const paddle = new Paddle(350, 550, 100, 20);
game.addSprite(paddle);

const ball = new Ball(400, 300, 10);
game.addSprite(ball);

const score = new Score(10, 20);
game.addSprite(score);

const hero = new Hero("heroSpritesheet.png", 640, 5, 1536, 256, 90, 6, 0.25);
game.addSprite(hero);

const lives = new Lives(700, 20);
game.addSprite(lives);

// Add StartScreen
const startScreen = new StartScreen(game, ball, score, lives);
game.addSprite(startScreen);

// Start the game loop
game.animate();
