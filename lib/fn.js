var util  = require('util');

var Proc = function() {
};

var Syntax = function() {
  Proc.apply(this, arguments);
};
util.inherits(Syntax, Proc);

exports.Proc = Proc;
exports.Syntax = Syntax;
