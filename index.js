var styles = require('./lib/styles.js'),
    util = require('./lib/util.js');

function tmuxToAnsi(value) {
  if (styles[value]) {
    return value;
  }
  switch(value) {
    case 'bright':
      return 'bold';
    case 'underscore':
      return 'underline';
    case 'italics':
      return 'italic';
    case 'default':
     return 'reset';
    case 'reverse':
      return 'inverse';
  }
  return;
}

module.exports = function(str, opts) {
  var tag = /#\[([^\]]+)\]/g,
      open = [],
      result,
      isTTY = (opts && opts.tty);

  if (!isTTY) {
    isTTY = (process && process.stdout && process.stdout.isTTY === true);
  }

  if (!isTTY) {
    return str;
  }

  function close() {
    if (open.length > 0) {
      open.forEach(function(style) {
        result += styles[style].close;
      });
      open = [];
    }
  }

  result = str.replace(tag, function(match, content) {
    var result = '',
        attrs = content.split(',');

    // close any previous styles
    close();

    attrs.forEach(function(attr) {
      var resolved;
      if (attr.indexOf('=') === -1) {
        resolved = tmuxToAnsi(attr);
      } else {
        var parts = attr.split('='),
            key = parts[0],
            value = parts[1];
        if (key == 'fg') {
          resolved = tmuxToAnsi(value);
          if (!resolved && /#[0-9a-f]{6}/.test(value)) {
            resolved = 'color' + util.rgb.apply(this, util.hex(value));
          }
        } else if (key == 'bg') {
          resolved = tmuxToAnsi('bg' + value.charAt(0).toUpperCase() + value.substr(1));
          if (!resolved && /#[0-9a-f]{6}/.test(value)) {
            resolved = 'bgColor' + util.rgb.apply(this, util.hex(value));
          }
        }
      }
      if (styles[resolved]) {
        result += styles[resolved].open;
        open.push(resolved);
      }
    });
    return result;
  });
  // close any remaining string
  close();
  return result;
};

module.exports.styles = styles;

