function Paddle() {
  Entity.call(this);

  this.width = 10;
  this.height = 80;

  this.x = 10;
  this.y = game.height / 2 - this.height / 2;
}

Paddle.prototype = Object.create(Entity.prototype);
Paddle.prototype.constructor = Paddle;
