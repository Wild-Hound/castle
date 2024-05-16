class Player extends Sprite {
  constructor(
    { collisionBlocks = [], imgSrc, frameRate, animations, loop },
    canvas,
    ctx
  ) {
    // console.log(imgSrc);
    super({ imgSrc, frameRate, animations, loop });
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
    const ctx = this.ctx;
    this.position.x += this.velocity.x;
    this.updatehitBox();

    this.checkHorizontalCollision();

    this.applyGravity();

    this.updatehitBox();

    this.checkVerticalCollision();
  }

  handleInput(keys) {
    if (this.preventInput) {
      return;
    }

    if (keys.d.pressed) {
      this.switchSprite("runRight");
      this.velocity.x = this.movementVelocity;
      this.lastDirection = "right";
    } else if (keys.a.pressed) {
      this.switchSprite("runLeft");
      this.velocity.x = -this.movementVelocity;
      this.lastDirection = "left";
    } else {
      if (this.lastDirection === "left") {
        this.switchSprite("idleLeft");
      } else {
        this.switchSprite("idleRight");
      }
    }
  }

  updatehitBox() {
    this.hitBox = {
      position: {
        x: this.position.x + 60,
        y: this.position.y + 33,
      },
      width: 50,
      height: 54,
    };
  }

  checkHorizontalCollision() {
    for (let i = 0; i < collisionBlocks.length; i++) {
      const collisionBlock = collisionBlocks[i];
      if (
        this.hitBox.position.x <=
          collisionBlock.position.x + collisionBlock.width &&
        this.hitBox.position.x + this.hitBox.width >=
          collisionBlock.position.x &&
        this.hitBox.position.y + this.hitBox.height >=
          collisionBlock.position.y &&
        this.hitBox.position.y <=
          collisionBlock.position.y + collisionBlock.height
      ) {
        if (this.velocity.x < 0) {
          const offset = this.hitBox.position.x - this.position.x;
          this.position.x =
            collisionBlock.position.x + collisionBlock.width - offset + 0.01;
          break;
        }

        if (this.velocity.x > 0) {
          const offset =
            this.hitBox.position.x - this.position.x + this.hitBox.width;
          this.position.x = collisionBlock.position.x - offset - 0.01;
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
        this.hitBox.position.x <=
          collisionBlock.position.x + collisionBlock.width &&
        this.hitBox.position.x + this.hitBox.width >=
          collisionBlock.position.x &&
        this.hitBox.position.y + this.hitBox.height >=
          collisionBlock.position.y &&
        this.hitBox.position.y <=
          collisionBlock.position.y + collisionBlock.height
      ) {
        if (this.velocity.y < 0) {
          this.velocity.y = 0;
          const offset = this.hitBox.position.y - this.position.y;
          this.position.y =
            collisionBlock.position.y + collisionBlock.height - offset + 0.01;
          break;
        }

        if (this.velocity.y > 0) {
          this.velocity.y = 0;
          const offset =
            this.hitBox.position.y - this.position.y + this.hitBox.height;
          this.position.y = collisionBlock.position.y - offset - 0.01;
          break;
        }
      }
    }
  }

  switchSprite(name) {
    if (this.image === this.animations[name].image) return;
    this.currentFrame = 0;
    this.image = this.animations[name].image;
    this.frameRate = this.animations[name].frameRate;
    this.frameBuffer = this.animations[name].frameBuffer;
    this.loop = this.animations[name].loop;
    this.currentAnimation = this.animations[name];
  }
}

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "w":
      for (let i = 0; i < doors.length; i++) {
        const door = doors[i];

        if (
          player.hitBox.position.x + player.hitBox.width <=
            door.position.x + door.width &&
          player.hitBox.position.x >= door.position.x &&
          player.hitBox.position.y + player.hitBox.height >= door.position.y &&
          player.hitBox.position.y <= door.position.y + door.height
        ) {
          player.velocity.x = 0;
          player.velocity.y = 0;
          player.preventInput = true;
          player.switchSprite("enterDoor");
          door.play();
          return;
        }
      }
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
