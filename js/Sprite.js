class Sprite {
  constructor({ position }, imgSrc, ctx) {
    this.ctx = ctx;
    this.position = position;
    this.image = new Image();
    this.image.src = imgSrc;
    this.loaded = false;
    this.image.onload = () => {
      this.loaded = true;
    };
  }

  draw() {
    const ctx = this.ctx;

    if (!this.loaded) {
      return;
    }
    ctx.drawImage(this.image, this.position.x, this.position.y);
  }
}
