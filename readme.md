# tmux-colors

Write tmux-compatible color strings and have them work both in the terminal and in tmux.

Useful for writing widgets that use colors and need to work in both the terminal and in tmux.

## Usage example

tmux-colors accepts strings written in a tmux-compatible format and converts them into terminal compatible output:

    var colors = require('tmux-colors');

    console.log(colors('#[fg=yellow,bold]Yellow bold#[default] Gray'));

By default, if `process.stdout.isTTY` is true, then colors will be converted into ANSI color codes. Otherwise, they are directly echoed. You can pass `{ tty: true }` as the second parameter to force ANSI color codes.

`colors.styles` exposes the styles as ANSI escape codes, which may be useful in some cases.

All the following are supported: black, red, green, yellow, blue, magenta,
cyan, white, default, bright, bold, dim, underscore, blink, reverse, hidden,italics, color0 ... color255, colour0 ... colour255 and RGB strings (`#ff0000`).

## Specifying colors in tmux

tmux uses a custom format for specifying colors, which is different from the set of codes used in the terminal. For compatibility, tmux-colors also uses the same format: #[attributes]

where attributes are a comma-separated list of 'fg=color' and 'bg=color', for example:

    #[fg=yellow,bold]Yellow bold#[default] Gray

Attributes may a comma-delimited list of one or more of: bright (or bold), dim, underscore, blink, reverse, hidden, or italics.

Color may be one of: black, red, green, yellow, blue, magenta,
cyan, white, default, colour0 to colour255. Newer tmux versions also support RGB strings such as #ffffff. See `man tmux` for more info.

tmux-colors also converts these strings to the appropriate TTY color codes for the terminal.
