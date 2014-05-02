var util  = require('util');

var Proc = function(scope, params, body) {
  this._scope = scope;
  this._params = params;
  this._body = body;
};

Proc.prototype.apply = function(scope, cells) {
  var values = cells.map(function(c) { return c.eval(scope) });
  if (this._body instanceof Function) {
    return this._body.apply(this, values);
  } else {
    var inner = this._scope.fork();
    this._params.forEach(function(name, i) {
      inner.set(name, values[i]);
    });
    return this._body.
           map(function(e) { return e.eval(inner) }).
           pop();
  }
};

var Syntax = function() {
  Proc.apply(this, arguments);
};
util.inherits(Syntax, Proc);

Syntax.prototype.apply = function(scope, cells) {
  return this._body(scope, cells);
};

exports.Proc = Proc;
exports.Syntax = Syntax;
