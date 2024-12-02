class Hero extends Sprite {
    constructor(imagePath, x, y, width, height, timePerFrame, numberOfFrames, scale = 1) {
        super();

        var heroSpritesheet = new Image();
        heroSpritesheet.src = imagePath;
        this.spritesheet = heroSpritesheet; 
        this.x = x;  
        this.y = y;
        this.width = width;        // Original width of the sprite sheet
        this.height = height;      // Original height of the sprite sheet                     
        this.timePerFrame = timePerFrame;           
        this.numberOfFrames = numberOfFrames || 1; 
        this.frameIndex = 0;
        this.lastUpdate = Date.now();
        this.scale = scale;        // Scaling factor for resizing
    }

    update() {
        if (Date.now() - this.lastUpdate >= this.timePerFrame) {
            this.frameIndex++;
            if (this.frameIndex >= this.numberOfFrames) {
                this.frameIndex = 0;
            }
            this.lastUpdate = Date.now();
        }
    }

    draw(ctx) {
        const frameWidth = this.width / this.numberOfFrames;
        const frameHeight = this.height;

        ctx.drawImage(
            this.spritesheet,
            this.frameIndex * frameWidth, // Source X
            0,                           // Source Y
            frameWidth,                  // Source Width
            frameHeight,                 // Source Height
            this.x,                      // Destination X
            this.y,                      // Destination Y
            frameWidth * this.scale,     // Destination Width (scaled)
            frameHeight * this.scale     // Destination Height (scaled)
        );
    }
}
