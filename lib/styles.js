var styles = require('ansi-styles');

// add missing styles which tmux uses
var codes = {
  dim: [ 2, 22 ],
  blink: [ 5, 25 ],
  hidden: [ 8, 28 ]
};

Object.keys(codes).forEach(function (key) {
  var val = codes[key];
  var style = styles[key] = {};
  style.open = '\x1b[' + val[0] + 'm';
  style.close = '\x1b[' + val[1] + 'm';
});

// add colour0 ... colour255 colors
var i;
for (i = 0; i < 256; i++) {
  var style = styles['colour' + i] = styles['color' + i] = {};
  style.open = '\x1b[38;5;' + i + 'm';
  style.close = '\x1b[39m';
  style = styles['bgColour' + i] = styles['bgColor' + i] = {};
  style.open = '\x1b[48;5;' + i + 'm';
  style.close = '\x1b[49m';
}

module.exports = styles;
