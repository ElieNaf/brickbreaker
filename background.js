class Background extends Sprite {
  constructor(src, backgroundY) {
    super();
    this.backgroundImage = new Image();
    this.backgroundImage.src = src;
    this.backgroundSpeed = 1;
    this.backgroundY = backgroundY;
  }

  update(keys) {
    this.backgroundY += this.backgroundSpeed;

    if (this.backgroundY >= canvas.height) {
      this.backgroundY = 0;
    }
  }

  draw(ctx) {
    ctx.drawImage(
      this.backgroundImage,
      0,
      this.backgroundY,
      canvas.width,
      canvas.height
    );

    ctx.drawImage(
      this.backgroundImage,
      0,
      this.backgroundY - canvas.height,
      canvas.width,
      canvas.height
    );
  }
}
