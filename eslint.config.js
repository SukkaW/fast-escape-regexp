'use strict';

module.exports = require('eslint-config-sukka').sukka({}, {
  files: ['./benchmark/**/*'],
  rules: {
    'import-x/no-unresolved': 'off'
  }
});
