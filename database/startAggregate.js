require('babel-register')({
  presets: ['env'],
});

module.exports = require('./aggregate.js');
