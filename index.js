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

// Add Necromancer (using 48x48 jump animation spritesheet)
const shadow = new Shadow(
    "Jump Animation 48x48.png", // Path to the jump animation spritesheet
    700, // X position (to the right of the hero)
    20, // Y position
    288, // Total width of the spritesheet (48px * 6 frames)
    48, // Height of each frame
    150, // Time per frame in milliseconds (adjust for animation speed)
    6 // Number of frames in the jump animation
);
game.addSprite(shadow);
const lives = new Lives(700, 20);
game.addSprite(lives);

// Add background sound
const backgroundSound = new Sound("backgroundSound.wav", true); // Adjust path to your sound file
game.addSprite(backgroundSound);

const ballHitSound = new Sound("ballHit.wav", false); // Adjust path to your sound file
game.addSprite(ballHitSound);

// Add StartScreen
const startScreen = new StartScreen(game, ball, score, lives);
game.addSprite(startScreen);

// Start the game loop
game.animate();
