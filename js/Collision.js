class CollisionBlock {
  constructor({ position }, ctx) {
    this.position = position;
    this.width = 64;
    this.height = 64;
    this.ctx = ctx;
  }

  draw() {
    const ctx = this.ctx;
    ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

const createCollisionBlocks = (collisionData, ctx) => {
  const collisionBlocks = [];

  collisionData.forEach((row, y) => {
    row.forEach((symbol, x) => {
      if (symbol === 292 || symbol === 250) {
        collisionBlocks.push(
          new CollisionBlock({ position: { x: x * 64, y: y * 64 } }, ctx)
        );
      }
    });
  });

  return collisionBlocks;
};
