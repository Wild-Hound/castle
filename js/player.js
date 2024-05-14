class Player extends Sprite {
  constructor({ collisionBlocks = [], imgSrc, frameRate }, canvas, ctx) {
    // console.log(imgSrc);
    super({ imgSrc, frameRate });
    this.ctx = ctx;
    this.canvas = canvas;
    this.collisionBlocks = collisionBlocks;
    this.position = {
      x: 200,
      y: 200,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.jumpVelocity = -20;
    this.movementVelocity = 8;
    this.gravity = 1;
    this.sides = {
      bottom: this.position.y + this.height,
    };
  }

  update() {
    this.position.x += this.velocity.x;

    this.checkHorizontalCollision();

    this.applyGravity();

    this.checkVerticalCollision();
  }

  checkHorizontalCollision() {
    for (let i = 0; i < collisionBlocks.length; i++) {
      const collisionBlock = collisionBlocks[i];
      if (
        this.position.x <= collisionBlock.position.x + collisionBlock.width &&
        this.position.x + this.width >= collisionBlock.position.x &&
        this.position.y + this.height >= collisionBlock.position.y &&
        this.position.y <= collisionBlock.position.y + collisionBlock.height
      ) {
        if (this.velocity.x < 0) {
          this.position.x =
            collisionBlock.position.x + collisionBlock.width + 0.01;
          break;
        }

        if (this.velocity.x > 0) {
          this.position.x = collisionBlock.position.x - this.width - 0.01;
          break;
        }
      }
    }
  }

  applyGravity() {
    this.velocity.y += this.gravity;
    this.position.y += this.velocity.y;
  }

  checkVerticalCollision() {
    for (let i = 0; i < collisionBlocks.length; i++) {
      const collisionBlock = collisionBlocks[i];
      if (
        this.position.x <= collisionBlock.position.x + collisionBlock.width &&
        this.position.x + this.width >= collisionBlock.position.x &&
        this.position.y + this.height >= collisionBlock.position.y &&
        this.position.y <= collisionBlock.position.y + collisionBlock.height
      ) {
        if (this.velocity.y < 0) {
          this.velocity.y = 0;
          this.position.y =
            collisionBlock.position.y + collisionBlock.height + 0.01;
          break;
        }

        if (this.velocity.y > 0) {
          this.velocity.y = 0;
          this.position.y = collisionBlock.position.y - this.height - 0.01;
          break;
        }
      }
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
