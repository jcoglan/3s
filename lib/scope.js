var util = require('util'),
    fn   = require('./fn');

var Scope = function(parent) {
  this._parent = parent;
  this._symbols = {};
};

Scope.prototype.fork = function() {
  return new Scope(this);
};

Scope.prototype.lookup = function(name) {
  if (this._symbols.hasOwnProperty(name)) {
    return this._symbols[name];
  } else if (this._parent) {
    return this._parent.lookup(name);
  } else {
    throw new Error('Unknown variable: ' + name);
  }
};

Scope.prototype.define = function(name, body) {
  this.set(name, new fn.Proc(this, [], body));
};

Scope.prototype.syntax = function(name, body) {
  this.set(name, new fn.Syntax(this, [], body));
};

Scope.prototype.set = function(name, value) {
  this._symbols[name] = value;
};

var TopLevel = function() {
  Scope.apply(this, arguments);

  this.syntax('define', function(scope, cells) {
    var name = cells[0].textValue,
        value = cells[1].eval(scope);

    scope.set(name, value);
  });

  this.syntax('lambda', function(scope, cells) {
    var params = cells[0].items.elements.map(function(e) { return e.datum.textValue });
    return new fn.Proc(scope, params, cells.slice(1));
  });

  this.syntax('if', function(scope, cells) {
    var which = cells[0].eval(scope) ? 1 : 2;
    return cells[which].eval(scope);
  });

  this.define('+', function(a,b) { return a + b });
  this.define('-', function(a,b) { return a - b });
  this.define('*', function(a,b) { return a * b });
  this.define('/', function(a,b) { return a / b });
  this.define('=', function(a,b) { return a == b });
};
util.inherits(TopLevel, Scope);

Scope.TopLevel = TopLevel;
module.exports = Scope;
