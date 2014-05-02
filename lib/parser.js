var parser = require('./lisp_parser').Parser;

parser.Program = {};

parser.Program.eval = function(scope) {
  return this.elements.
         map(function(e) { return e.eval(scope) }).
         pop();
};

parser.Cell = {};

parser.Cell.eval = function(scope) {
  return this.datum.eval(scope);
};

parser.List = {};

parser.List.eval = function(scope) {
  var cells = this.items.elements.map(function(e) { return e.datum }),
      proc = cells[0].eval(scope),
      values = cells.slice(1);

  return proc.apply(scope, values);
};

parser.Symbol = {};

parser.Symbol.eval = function(scope) {
  return scope.lookup(this.textValue);
};

parser.Integer = {};

parser.Integer.eval = function() {
  return parseInt(this.textValue, 10);
};

parser.Boolean = {};

parser.Boolean.eval = function() {
  return this.textValue === '#t';
};

module.exports = parser;
