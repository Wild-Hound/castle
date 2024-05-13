class Player {
  constructor(canvas, ctx) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.position = {
      x: 100,
      y: 100,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.gravity = 1;
    this.width = 100;
    this.height = 100;
    this.sides = {
      bottom: this.position.y + this.height,
    };
  }

  draw() {
    const ctx = this.ctx;
    ctx.fillStyle = "red";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    const canvas = this.canvas;

    this.position.y += this.velocity.y;

    if (this.sides.bottom + this.velocity.y < canvas.height) {
      this.velocity.y += this.gravity;
      this.sides.bottom = this.position.y + this.height;
      return;
    } else {
      this.velocity.y = 0;
    }
  }
}
