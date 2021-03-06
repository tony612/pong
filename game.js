// The game engine

function Game(canvas) {
  var self = this;

  this.context = canvas.getContext("2d");
  this.width = canvas.width;
  this.height = canvas.height;

  // Keep track of key states
  // Eg.:
  //   game.keyPressed.up === true  // while UP key is pressed
  //   game.keyPressed.up === false // when UP key is released
  this.keyPressed = {};

  $(canvas).on('keydown keyup', function(e) {
    // Convert key code to key name
    var keyName = Game.keys[e.which];

    if (keyName) {
      // eg.: `self.keyPressed.up = true` on keydown
      // Will be set to `false` on keyup
      self.keyPressed[keyName] = e.type === 'keydown';
      e.preventDefault();
    }
  });
}

// Some key codes to key name mapping
Game.keys = {
  32: 'space',
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down'
};

Game.prototype.draw = function () {
  var self = this;
  this.entities.forEach(function (entity) {
    if (entity.draw) entity.draw(self.context);
  });
};

Game.prototype.update = function () {
  this.entities.forEach(function (entity) {
    if (entity.update) entity.update();
  });
};

Game.prototype.start = function () {
  // var self = this,
  //     fps = 60,
  //     interval = 1000 / fps; // ms per frame
  //
  // setInterval(function() {
  //   self.update();
  //   self.draw();
  // }, interval);

  this.lastUpdateTime = new Date().getTime();

  var self = this;
  onFrame(function() {
    self.variableTimeStep();
  });
};

var onFrame = function (callback) {
  if (window.requestAnimationFrame) {
    requestAnimationFrame(function () {
      callback();

      onFrame(callback);
    });
  } else {
    var fps = 60;
    setInterval(callback, 1000 / fps);
  }
};

Game.prototype.variableTimeStep = function () {
  var currentTime = new Date().getTime(),
      fps = 60,
      interval = 1000 / fps,
      timeDelta = currentTime - this.lastUpdateTime,
      percentageOfInterval = timeDelta / interval;

  this.update(percentageOfInterval);
  this.draw();

  this.lastUpdateTime = new Date().getTime();
};
