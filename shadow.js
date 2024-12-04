class Shadow extends Sprite {
    constructor(imagePath, x, y, width, height, timePerFrame, numberOfFrames, scale = 1) {
        super();

        var shadowSpritesheet = new Image();
        shadowSpritesheet.src = imagePath;
        this.spritesheet = shadowSpritesheet; 
        this.x = x;  
        this.y = y;
        this.width = width;        // Total width of the spritesheet row
        this.height = height;      // Height of each frame                     
        this.timePerFrame = timePerFrame; // Time per frame in milliseconds
        this.numberOfFrames = numberOfFrames || 1; // Total frames in the animation
        this.frameIndex = 0; // Start at the first frame
        this.lastUpdate = Date.now(); // Track time since last frame update
        this.scale = scale;        // Scaling factor for resizing
    }

    update() {
        const now = Date.now();
        if (now - this.lastUpdate >= this.timePerFrame) {
            this.frameIndex = (this.frameIndex + 1) % this.numberOfFrames; // Cycle through frames
            this.lastUpdate = now;
        }
    }

    draw(ctx) {
        const frameWidth = this.width / this.numberOfFrames; // Calculate the width of a single frame

        ctx.drawImage(
            this.spritesheet,
            this.frameIndex * frameWidth, // Source X (moves horizontally to the next frame)
            0,                           // Source Y (animation is in the first row)
            frameWidth,                  // Source Width
            this.height,                 // Source Height
            this.x,                      // Destination X
            this.y,                      // Destination Y
            frameWidth * this.scale,     // Destination Width (scaled)
            this.height * this.scale     // Destination Height (scaled)
        );
    }
}
