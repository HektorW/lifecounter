
window.onerror = function() {
  alert(arguments[0] + ', ' + arguments[1] + ', ' + arguments[2]);
};

var colors = {
  navy: '#001F3F',
  blue: '#0074D9',
  aqua: '#7FDBFF',
  teal: '#39CCCC',
  olive: '#3D9970',
  green: '#2ECC40',
  lime: '#01FF70',
  yellow: '#FFDC00',
  orange: '#FF851B',
  red: '#FF4136',
  maroon: '#85144B',
  fuchsia: '#F012BE',
  purple: '#B10DC9',
  white: '#FFFFFF',
  silver: '#DDDDDD',
  gray: '#AAAAAA',
  black: '#111111'
};


$(function() {
  $('.lifecounter').each(function(index, element) {
    var $el = $(element);

    var hash = window.location.hash.substr(1);
    var life = parseInt(hash.substr(hash.indexOf('=') + 1), 10);


    new LifeCounter($el, life);
  });


  $('.colorpicker [data-color]').click(function(event) {
    var $el = $(this);
    var color = $el.attr('data-color');
    var c = colors[color];

    if(c) {
      $('body').css('background-color', c);
    }
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
    this.deacrease();
  else if(dx < -20)
    this.increase();
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

LifeCounter.prototype.setvalue = function(value, animate) {
  var $val = this.$el.find('.value'),
      $target = $val.find('.target'),
      $from = $val.find('.from');

  $val.find('div')
    .removeAttr('style');
  $target.css({
    '-webkit-transform': 'rotateY(-180deg)'
  }).text(value);
  $from.text(this.value);

  setTimeout(function() {
    $target.css({
     '-webkit-transform': 'rotateY(0deg)',
     '-webkit-backface-visibility': 'hidden',
     'transition': '-webkit-transform 0.3s'
    });
    $from.css({
     '-webkit-transform': 'rotateY(180deg)',
     '-webkit-backface-visibility': 'hidden',
     'transition': '-webkit-transform 0.3s'
    });
  }, 0);
  this.value = value;

  // this.$el.find('.value').text(this.value);

  if(window.history.replaceState) {
    window.history.replaceState(null, null, '#life=' + this.value);
  } else {
    window.location.hash = '#life=' + this.value;
  }
};