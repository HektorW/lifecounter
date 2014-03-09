
window.onerror = function() {
  alert(arguments[0] + ', ' + arguments[1] + ', ' + arguments[2]);
};


$(function() {
  $('.lifecounter').each(function(index, element) {
    var $el = $(element);
    new LifeCounter($el);
  });
});


function LifeCounter($el, value) {
  this.$el = $el;
  this.value = value || 1;

  _.bindAll(this, 'ontouchstart', 'ontouchmove', 'ontouchend', 'onclick');

  this.$el
    .on('touchstart', this.ontouchstart)
    .on('touchmove', this.ontouchmove)
    .on('touchend', this.ontouchend)
    .on('touchcancel', this.ontouchcancel)
    .on('click', this.onclick);


    this.setvalue(this.value);
}
LifeCounter.prototype.ontouchstart = function(event) {
  var touches = event.originalEvent.touches;

  this.touchstart_x = touches[0].pageX;
  this.touchstart_y = touches[0].pageY;
};
LifeCounter.prototype.ontouchmove = function(event) {
  var touches = event.originalEvent.touches;
  event.preventDefault();
};
LifeCounter.prototype.ontouchend = function(event) {
  var touches = event.originalEvent.changedTouches;
  var x = touches[0].pageX;
  var y = touches[0].pageY;

  this.handletouchrelease(x, y);
};
LifeCounter.prototype.ontouchcancel = function(event) {
  var touches = event.originalEvent.touches || event.originalEvent.changedTouches;
  var x = touches[0].pageX;
  var y = touches[0].pageY;

  this.handletouchrelease(x, y);
};
LifeCounter.prototype.handletouchrelease = function(x, y) {
  var dx = x - this.touchstart_x;
  var dy = y - this.touchstart_y;

  if(dx > 20)
    this.increase();
  else if(dx < -20)
    this.deacrease();
};

LifeCounter.prototype.onclick = function(event) {
  console.log(event);
  switch(event.which) {
    case 1:
      this.increase();
      break;
    case 2:
      this.deacrease();
      break;
  }
  event.preventDefault();
};

LifeCounter.prototype.increase = function() {
  this.setvalue(this.value + 1);
};

LifeCounter.prototype.deacrease = function() {
  this.setvalue(this.value - 1);
};

LifeCounter.prototype.setvalue = function(value) {
  this.value = value;
  this.$el.find('.value').text(this.value);
};