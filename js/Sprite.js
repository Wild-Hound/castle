class Sprite {
  constructor(
    {
      position,
      imgSrc,
      frameRate = 1,
      animations,
      frameBuffer = 2,
      loop = true,
      autoplay = true,
    },
    ctx
  ) {
    this.ctx = ctx;
    this.position = position;
    this.image = new Image();
    this.image.src = imgSrc;
    this.loaded = false;
    this.frameRate = frameRate;
    this.currentFrame = 0;
    this.elapsedFrames = 0;
    this.frameBuffer = frameBuffer;
    this.animations = animations;
    this.loop = loop;
    this.autoplay = autoplay;
    this.image.onload = () => {
      this.loaded = true;
      this.width = this.image.width / frameRate;
      this.height = this.image.height;
    };

    if (this.animations) {
      for (let key in this.animations) {
        const image = new Image();
        image.src = this.animations[key].imgSrc;
        this.animations[key].image = image;
      }
    }
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

  play() {
    this.autoplay = true;
  }

  updateFrames() {
    if (!this.autoplay) {
      return;
    }
    this.elapsedFrames++;

    if (this.elapsedFrames % this.frameBuffer === 0) {
      if (this.currentFrame < this.frameRate - 1) this.currentFrame++;
      else if (this.loop) {
        this.currentFrame = 0;
      }
    }
  }
}
