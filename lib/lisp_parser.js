(function() {
  var extend = function (destination, source) {
    if (!destination || !source) return destination;
    for (var key in source) {
      if (destination[key] !== source[key])
        destination[key] = source[key];
    }
    return destination;
  };
  
  var find = function (root, objectName) {
    var parts = objectName.split('.'),
        part;
    
    while (part = parts.shift()) {
      root = root[part];
      if (root === undefined)
        throw new Error('Cannot find object named ' + objectName);
    }
    return root;
  };
  
  var formatError = function (error) {
    var lines  = error.input.split(/\n/g),
        lineNo = 0,
        offset = 0;
    
    while (offset < error.offset + 1) {
      offset += lines[lineNo].length + 1;
      lineNo += 1;
    }
    var message = 'Line ' + lineNo + ': expected ' + error.expected + '\n',
        line    = lines[lineNo - 1];
    
    message += line + '\n';
    offset  -= line.length + 1;
    
    while (offset < error.offset) {
      message += ' ';
      offset  += 1;
    }
    return message + '^';
  };
  
  var Grammar = {
    __consume__paren: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["paren"] = this._nodeCache["paren"] || {};
      var cached = this._nodeCache["paren"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset;
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 === "(") {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = null;
        address0 = new klass0("(", this._offset, []);
        if (typeof type0 === "object") {
          extend(address0, type0);
        }
        this._offset += 1;
      } else {
        address0 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"(\""};
        }
      }
      if (address0) {
      } else {
        this._offset = index1;
        var slice2 = null;
        if (this._input.length > this._offset) {
          slice2 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice2 = null;
        }
        if (slice2 === ")") {
          var klass1 = this.constructor.SyntaxNode;
          var type1 = null;
          address0 = new klass1(")", this._offset, []);
          if (typeof type1 === "object") {
            extend(address0, type1);
          }
          this._offset += 1;
        } else {
          address0 = null;
          var slice3 = null;
          if (this._input.length > this._offset) {
            slice3 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice3 = null;
          }
          if (!this.error || this.error.offset <= this._offset) {
            this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\")\""};
          }
        }
        if (address0) {
        } else {
          this._offset = index1;
        }
      }
      return this._nodeCache["paren"][index0] = address0;
    },
    __consume__space: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["space"] = this._nodeCache["space"] || {};
      var cached = this._nodeCache["space"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 && /^[\s\n\r\t]/.test(slice0)) {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = null;
        address0 = new klass0(slice0, this._offset, []);
        if (typeof type0 === "object") {
          extend(address0, type0);
        }
        this._offset += 1;
      } else {
        address0 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "[\\s\\n\\r\\t]"};
        }
      }
      return this._nodeCache["space"][index0] = address0;
    }
  };
  
  var Parser = function(input) {
    this._input = input;
    this._offset = 0;
    this._nodeCache = {};
  };
  
  Parser.prototype.parse = function() {
    var result = this.__consume__paren();
    if (result && this._offset === this._input.length) {
      return result;
    }
    if (!(this.error)) {
      this.error = {input: this._input, offset: this._offset, expected: "<EOF>"};
    }
    var message = formatError(this.error);
    var error = new Error(message);
    throw error;
  };
  
  Parser.parse = function(input) {
    var parser = new Parser(input);
    return parser.parse();
  };
  
  extend(Parser.prototype, Grammar);
  
  var SyntaxNode = function(textValue, offset, elements, properties) {
    this.textValue = textValue;
    this.offset    = offset;
    this.elements  = elements || [];
    if (!properties) return;
    for (var key in properties) this[key] = properties[key];
  };
  
  SyntaxNode.prototype.forEach = function(block, context) {
    for (var i = 0, n = this.elements.length; i < n; i++) {
      block.call(context, this.elements[i], i);
    }
  };
  
  Parser.SyntaxNode = SyntaxNode;
  
  if (typeof require === "function" && typeof exports === "object") {
    exports.Grammar = Grammar;
    exports.Parser  = Parser;
    exports.parse   = Parser.parse;
    
  } else {
    var namespace = this;
    Lisp = Grammar;
    LispParser = Parser;
    LispParser.formatError = formatError;
  }
})();

