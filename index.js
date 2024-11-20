const game = new Game();
var background = new Background("spaceBackground.jpg",0);

game.addSprite(background);
const paddle = new Paddle(350, 550, 100, 20);
game.addSprite(paddle);

const ball = new Ball(400, 300, 10); 
game.addSprite(ball);


for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 10; j++) {
        const resistance = Math.floor(Math.random() * 3) + 1; 
        const brick = new Brick(80 * j, 30 * i, 70, 20, resistance);
        game.addSprite(brick);
    }
}



game.animate();
