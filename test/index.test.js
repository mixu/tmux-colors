var assert = require('assert'),
    colors = require('../index.js');

exports['tests'] = {

  'it works': function() {
    console.log(colors('#[fg=yellow,bold]Yellow bold#[default] Gray'), { tty: true });
  },

  'all attributes fg': function() {
    var cases = [
      '#[fg=red,bright]Red bright',
      '#[fg=green,bold]Green bold',
      '#[fg=yellow,dim]Yellow dim #[fg=yellow]Regular Yellow',
      '#[fg=blue,underscore]Blue underscore',
      '#[fg=magenta,blink]Magenta blink',
      '#[fg=cyan,reverse]Cyan reverse',
      '#[fg=white,hidden]White hidden',
      '#[fg=red,italics]Red italics'
    ];

    cases.forEach(function(str) {
      console.log(colors(str, { tty: true }));
    });
  },

  'all attributes bg': function() {
    var cases = [
      '#[bg=red,bright]Red bright',
      '#[bg=green,bold]Green bold',
      '#[bg=yellow,dim]Yellow dim #[fg=yellow]Regular Yellow',
      '#[bg=blue,underscore]Blue underscore',
      '#[bg=magenta,blink]Magenta blink',
      '#[bg=cyan,reverse]Cyan reverse',
      '#[bg=white,hidden]White hidden',
      '#[bg=red,italics]Red italics'
    ];

    cases.forEach(function(str) {
      console.log(colors(str, { tty: true }));
    });
  },

  '256 colors': function() {
    var i;
    for (i = 0; i < 256; i++) {
      var name = 'colour' + i;
      var name2 = 'color' + i;
      console.log(colors('#[fg=' + name + ']' + name, { tty: true }), colors('#[bg=' + name2 + ']' + name2, { tty: true }));
    }
  },

  'notty': function() {
    console.log(colors('#[fg=yellow,bold]Yellow bold#[default] Gray', { tty: false }));
  },

  'hex': function() {
    console.log(colors('#[fg=#660000,bold] #660000', { tty: true }));
  }
};

// if this module is the script being run, then run the tests:
if (module == require.main) {
  var mocha = require('child_process').spawn('mocha', [
    '--colors', '--ui', 'exports', '--reporter', 'spec', __filename
  ]);
  mocha.stderr.on('data', function (data) {
    if (/^execvp\(\)/.test(data)) {
     console.log('Failed to start child process. You need mocha: `npm install -g mocha`');
    }
  });
  mocha.stdout.pipe(process.stdout);
  mocha.stderr.pipe(process.stderr);
}

