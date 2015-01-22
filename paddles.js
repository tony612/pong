function Paddle() {
  Entity.call(this);

  this.width = 20;
  this.height = 100;

  this.score = 0;
}

Paddle.prototype = Object.create(Entity.prototype);
Paddle.prototype.constructor = Paddle;

Paddle.prototype.update = function() {
  Entity.prototype.update.apply(this, arguments);

  this.y = Math.min(Math.max(this.y, 0), game.height - this.height);

  if (this.intersect(ball)) {
    ball.xVelocity *= -1.1;
    ball.yVelocity += this.yVelocity * 0.3;
  }
};

function Player() {
  Paddle.call(this);

  this.x = 20;
  this.y = game.height / 2 - this.height / 2;
}

Player.prototype = Object.create(Paddle.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
  Paddle.prototype.update.apply(this, arguments);

  if (game.keyPressed.up) {
    this.yVelocity = -11;
  } else if (game.keyPressed.down) {
    this.yVelocity = 11;
  } else {
    this.yVelocity = 0;
  }
};

function Bot() {
  Paddle.call(this);

  this.x = game.width - this.width - 20;
  this.y = game.height / 2 - this.height / 2;
}

Bot.prototype = Object.create(Paddle.prototype);
Bot.prototype.constructor = Bot;

Bot.prototype.update = function() {
  Paddle.prototype.update.apply(this, arguments);

  this.yVelocity = this.y > ball.y ? -5 : 5;
};
