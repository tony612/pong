function Ball() {
  Entity.call(this);

  this.width = 20;
  this.height = 20;

  this.reset();
}

Ball.prototype = Object.create(Entity.prototype);
Ball.prototype.constructor = Ball;

Ball.prototype.update = function() {
  Entity.prototype.update.apply(this, arguments);

  if (this.y > game.height - this.height) {
    this.yVelocity *= -1;
  } else if (this.y < 0) {
    this.yVelocity *= -1;
  }

  var hitter = false;
  if (this.x > game.width) {
    this.reset();
    player.score += 1;
  }

  if (this.x < 0) {
    this.reset();
    bot.score += 1;
  }
};

Ball.prototype.reset = function() {
  this.x = game.width / 2 - this.width;
  this.y = game.height / 2 - this.height;

  var min = -8,
      max = 8;
  this.xVelocity = Math.random() > 0.5 ? 7 : -7;
  this.yVelocity = Math.floor(Math.random() * (max - min)) + min;
};
