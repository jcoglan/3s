var util = require('util'),
    fn   = require('./fn');

var Scope = function() {
};

var TopLevel = function() {
  Scope.apply(this, arguments);
};
util.inherits(TopLevel, Scope);

Scope.TopLevel = TopLevel;
module.exports = Scope;
