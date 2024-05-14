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
    this.jumpVelocity = -20;
    this.movementVelocity = 8;
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

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.sides.bottom = this.position.y + this.height;

    if (this.sides.bottom + this.velocity.y < canvas.height) {
      this.velocity.y += this.gravity;

      return;
    } else {
      this.velocity.y = 0;
    }
  }
}

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "w":
      if (player.velocity.y === 0) player.velocity.y = player.jumpVelocity;
      break;
    case "a":
      keys.a.pressed = true;
      break;
    case "d":
      keys.d.pressed = true;
      break;
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "a":
      keys.a.pressed = false;
      break;
    case "d":
      keys.d.pressed = false;
      break;
  }
});
