class Sprite {
  constructor({ position, imgSrc, frameRate = 1 }, ctx) {
    console.log(imgSrc);
    this.ctx = ctx;
    this.position = position;
    this.image = new Image();
    this.image.src = imgSrc;
    this.loaded = false;
    this.frameRate = frameRate;
    this.currentFrame = 0;
    this.elapsedFrames = 0;
    this.frameBuffer = 2;
    this.image.onload = () => {
      this.loaded = true;
      this.width = this.image.width / frameRate;
      this.height = this.image.height;
    };
  }

  draw() {
    const ctx = this.ctx;

    if (!this.loaded) {
      return;
    }
    const cropBox = {
      position: {
        x: this.width * this.currentFrame,
        y: 0,
      },
      width: this.width,
      height: this.height,
    };
    ctx.drawImage(
      this.image,
      cropBox.position.x,
      cropBox.position.y,
      cropBox.width,
      cropBox.height,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );

    this.updateFrames();
  }

  updateFrames() {
    this.elapsedFrames++;

    if (this.elapsedFrames % this.frameBuffer === 0) {
      if (this.currentFrame < this.frameRate - 1) this.currentFrame++;
      else this.currentFrame = 0;
    }
  }
}
