var util = require('util'),
    fn   = require('./fn');

var Scope = function() {
};

var TopLevel = function(parent) {
  Scope.call(this, parent);
};
util.inherits(TopLevel, Scope);

Scope.TopLevel = TopLevel;
module.exports = Scope;
