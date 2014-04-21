var fs     = require('fs'),
    parser = require('./parser'),
    Scope  = require('./scope');

var Lisp = {
  run: function(pathname) {
    var program = fs.readFileSync(pathname, 'utf8'),
        tree    = parser.parse(program),
        scope   = new Scope.TopLevel();

    return tree.eval(scope);
  }
};

module.exports = Lisp;
