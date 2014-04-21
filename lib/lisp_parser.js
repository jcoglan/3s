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
    __consume__program: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["program"] = this._nodeCache["program"] || {};
      var cached = this._nodeCache["program"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var remaining0 = 0, index1 = this._offset, elements0 = [], text0 = "", address1 = true;
      while (address1) {
        address1 = this.__consume__cell();
        if (address1) {
          elements0.push(address1);
          text0 += address1.textValue;
          remaining0 -= 1;
        }
      }
      if (remaining0 <= 0) {
        this._offset = index1;
        var klass0 = this.constructor.SyntaxNode;
        var type0 = find(this.constructor, "Program");
        address0 = new klass0(text0, this._offset, elements0);
        if (typeof type0 === "object") {
          extend(address0, type0);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["program"][index0] = address0;
    },
    __consume__cell: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["cell"] = this._nodeCache["cell"] || {};
      var cached = this._nodeCache["cell"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      var remaining0 = 0, index2 = this._offset, elements1 = [], text1 = "", address2 = true;
      while (address2) {
        address2 = this.__consume__space();
        if (address2) {
          elements1.push(address2);
          text1 += address2.textValue;
          remaining0 -= 1;
        }
      }
      if (remaining0 <= 0) {
        this._offset = index2;
        var klass0 = this.constructor.SyntaxNode;
        var type0 = null;
        address1 = new klass0(text1, this._offset, elements1);
        if (typeof type0 === "object") {
          extend(address1, type0);
        }
        this._offset += text1.length;
      } else {
        address1 = null;
      }
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        var address3 = null;
        address3 = this.__consume__datum();
        if (address3) {
          elements0.push(address3);
          text0 += address3.textValue;
          labelled0.datum = address3;
          var address4 = null;
          var remaining1 = 0, index3 = this._offset, elements2 = [], text2 = "", address5 = true;
          while (address5) {
            address5 = this.__consume__space();
            if (address5) {
              elements2.push(address5);
              text2 += address5.textValue;
              remaining1 -= 1;
            }
          }
          if (remaining1 <= 0) {
            this._offset = index3;
            var klass1 = this.constructor.SyntaxNode;
            var type1 = null;
            address4 = new klass1(text2, this._offset, elements2);
            if (typeof type1 === "object") {
              extend(address4, type1);
            }
            this._offset += text2.length;
          } else {
            address4 = null;
          }
          if (address4) {
            elements0.push(address4);
            text0 += address4.textValue;
          } else {
            elements0 = null;
            this._offset = index1;
          }
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0) {
        this._offset = index1;
        var klass2 = this.constructor.SyntaxNode;
        var type2 = find(this.constructor, "Cell");
        address0 = new klass2(text0, this._offset, elements0, labelled0);
        if (typeof type2 === "object") {
          extend(address0, type2);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["cell"][index0] = address0;
    },
    __consume__datum: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["datum"] = this._nodeCache["datum"] || {};
      var cached = this._nodeCache["datum"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset;
      address0 = this.__consume__list();
      if (address0) {
      } else {
        this._offset = index1;
        address0 = this.__consume__integer();
        if (address0) {
        } else {
          this._offset = index1;
          address0 = this.__consume__boolean();
          if (address0) {
          } else {
            this._offset = index1;
            address0 = this.__consume__symbol();
            if (address0) {
            } else {
              this._offset = index1;
            }
          }
        }
      }
      return this._nodeCache["datum"][index0] = address0;
    },
    __consume__list: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["list"] = this._nodeCache["list"] || {};
      var cached = this._nodeCache["list"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 === "(") {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = null;
        address1 = new klass0("(", this._offset, []);
        if (typeof type0 === "object") {
          extend(address1, type0);
        }
        this._offset += 1;
      } else {
        address1 = null;
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
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        var address2 = null;
        var remaining0 = 0, index2 = this._offset, elements1 = [], text1 = "", address3 = true;
        while (address3) {
          address3 = this.__consume__cell();
          if (address3) {
            elements1.push(address3);
            text1 += address3.textValue;
            remaining0 -= 1;
          }
        }
        if (remaining0 <= 0) {
          this._offset = index2;
          var klass1 = this.constructor.SyntaxNode;
          var type1 = null;
          address2 = new klass1(text1, this._offset, elements1);
          if (typeof type1 === "object") {
            extend(address2, type1);
          }
          this._offset += text1.length;
        } else {
          address2 = null;
        }
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
          labelled0.items = address2;
          var address4 = null;
          var slice2 = null;
          if (this._input.length > this._offset) {
            slice2 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice2 = null;
          }
          if (slice2 === ")") {
            var klass2 = this.constructor.SyntaxNode;
            var type2 = null;
            address4 = new klass2(")", this._offset, []);
            if (typeof type2 === "object") {
              extend(address4, type2);
            }
            this._offset += 1;
          } else {
            address4 = null;
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
          if (address4) {
            elements0.push(address4);
            text0 += address4.textValue;
          } else {
            elements0 = null;
            this._offset = index1;
          }
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0) {
        this._offset = index1;
        var klass3 = this.constructor.SyntaxNode;
        var type3 = find(this.constructor, "List");
        address0 = new klass3(text0, this._offset, elements0, labelled0);
        if (typeof type3 === "object") {
          extend(address0, type3);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["list"][index0] = address0;
    },
    __consume__integer: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["integer"] = this._nodeCache["integer"] || {};
      var cached = this._nodeCache["integer"][index0];
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
      if (slice0 === "0") {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = null;
        address0 = new klass0("0", this._offset, []);
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
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"0\""};
        }
      }
      if (address0) {
        var type1 = find(this.constructor, "Integer");
        if (typeof type1 === "object") {
          extend(address0, type1);
        }
      } else {
        this._offset = index1;
        var index2 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
        var address1 = null;
        var slice2 = null;
        if (this._input.length > this._offset) {
          slice2 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice2 = null;
        }
        if (slice2 && /^[1-9]/.test(slice2)) {
          var klass1 = this.constructor.SyntaxNode;
          var type2 = null;
          address1 = new klass1(slice2, this._offset, []);
          if (typeof type2 === "object") {
            extend(address1, type2);
          }
          this._offset += 1;
        } else {
          address1 = null;
          var slice3 = null;
          if (this._input.length > this._offset) {
            slice3 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice3 = null;
          }
          if (!this.error || this.error.offset <= this._offset) {
            this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "[1-9]"};
          }
        }
        if (address1) {
          elements0.push(address1);
          text0 += address1.textValue;
          var address2 = null;
          var remaining0 = 0, index3 = this._offset, elements1 = [], text1 = "", address3 = true;
          while (address3) {
            var slice4 = null;
            if (this._input.length > this._offset) {
              slice4 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice4 = null;
            }
            if (slice4 && /^[0-9]/.test(slice4)) {
              var klass2 = this.constructor.SyntaxNode;
              var type3 = null;
              address3 = new klass2(slice4, this._offset, []);
              if (typeof type3 === "object") {
                extend(address3, type3);
              }
              this._offset += 1;
            } else {
              address3 = null;
              var slice5 = null;
              if (this._input.length > this._offset) {
                slice5 = this._input.substring(this._offset, this._offset + 1);
              } else {
                slice5 = null;
              }
              if (!this.error || this.error.offset <= this._offset) {
                this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "[0-9]"};
              }
            }
            if (address3) {
              elements1.push(address3);
              text1 += address3.textValue;
              remaining0 -= 1;
            }
          }
          if (remaining0 <= 0) {
            this._offset = index3;
            var klass3 = this.constructor.SyntaxNode;
            var type4 = null;
            address2 = new klass3(text1, this._offset, elements1);
            if (typeof type4 === "object") {
              extend(address2, type4);
            }
            this._offset += text1.length;
          } else {
            address2 = null;
          }
          if (address2) {
            elements0.push(address2);
            text0 += address2.textValue;
          } else {
            elements0 = null;
            this._offset = index2;
          }
        } else {
          elements0 = null;
          this._offset = index2;
        }
        if (elements0) {
          this._offset = index2;
          var klass4 = this.constructor.SyntaxNode;
          var type5 = null;
          address0 = new klass4(text0, this._offset, elements0, labelled0);
          if (typeof type5 === "object") {
            extend(address0, type5);
          }
          this._offset += text0.length;
        } else {
          address0 = null;
        }
        if (address0) {
          var type6 = find(this.constructor, "Integer");
          if (typeof type6 === "object") {
            extend(address0, type6);
          }
        } else {
          this._offset = index1;
        }
      }
      return this._nodeCache["integer"][index0] = address0;
    },
    __consume__boolean: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["boolean"] = this._nodeCache["boolean"] || {};
      var cached = this._nodeCache["boolean"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset;
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 2);
      } else {
        slice0 = null;
      }
      if (slice0 === "#t") {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = null;
        address0 = new klass0("#t", this._offset, []);
        if (typeof type0 === "object") {
          extend(address0, type0);
        }
        this._offset += 2;
      } else {
        address0 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"#t\""};
        }
      }
      if (address0) {
        var type1 = find(this.constructor, "Boolean");
        if (typeof type1 === "object") {
          extend(address0, type1);
        }
      } else {
        this._offset = index1;
        var slice2 = null;
        if (this._input.length > this._offset) {
          slice2 = this._input.substring(this._offset, this._offset + 2);
        } else {
          slice2 = null;
        }
        if (slice2 === "#f") {
          var klass1 = this.constructor.SyntaxNode;
          var type2 = null;
          address0 = new klass1("#f", this._offset, []);
          if (typeof type2 === "object") {
            extend(address0, type2);
          }
          this._offset += 2;
        } else {
          address0 = null;
          var slice3 = null;
          if (this._input.length > this._offset) {
            slice3 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice3 = null;
          }
          if (!this.error || this.error.offset <= this._offset) {
            this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"#f\""};
          }
        }
        if (address0) {
          var type3 = find(this.constructor, "Boolean");
          if (typeof type3 === "object") {
            extend(address0, type3);
          }
        } else {
          this._offset = index1;
        }
      }
      return this._nodeCache["boolean"][index0] = address0;
    },
    __consume__symbol: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["symbol"] = this._nodeCache["symbol"] || {};
      var cached = this._nodeCache["symbol"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var remaining0 = 1, index1 = this._offset, elements0 = [], text0 = "", address1 = true;
      while (address1) {
        var index2 = this._offset, elements1 = [], labelled0 = {}, text1 = "";
        var address2 = null;
        var index3 = this._offset;
        address2 = this.__consume__delimiter();
        this._offset = index3;
        if (!(address2)) {
          var klass0 = this.constructor.SyntaxNode;
          var type0 = null;
          address2 = new klass0("", this._offset, []);
          if (typeof type0 === "object") {
            extend(address2, type0);
          }
          this._offset += 0;
        } else {
          address2 = null;
        }
        if (address2) {
          elements1.push(address2);
          text1 += address2.textValue;
          var address3 = null;
          var slice0 = null;
          if (this._input.length > this._offset) {
            slice0 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice0 = null;
          }
          var temp0 = slice0;
          if (temp0 === null) {
            address3 = null;
            var slice1 = null;
            if (this._input.length > this._offset) {
              slice1 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice1 = null;
            }
            if (!this.error || this.error.offset <= this._offset) {
              this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "<any char>"};
            }
          } else {
            var klass1 = this.constructor.SyntaxNode;
            var type1 = null;
            address3 = new klass1(temp0, this._offset, []);
            if (typeof type1 === "object") {
              extend(address3, type1);
            }
            this._offset += 1;
          }
          if (address3) {
            elements1.push(address3);
            text1 += address3.textValue;
          } else {
            elements1 = null;
            this._offset = index2;
          }
        } else {
          elements1 = null;
          this._offset = index2;
        }
        if (elements1) {
          this._offset = index2;
          var klass2 = this.constructor.SyntaxNode;
          var type2 = null;
          address1 = new klass2(text1, this._offset, elements1, labelled0);
          if (typeof type2 === "object") {
            extend(address1, type2);
          }
          this._offset += text1.length;
        } else {
          address1 = null;
        }
        if (address1) {
          elements0.push(address1);
          text0 += address1.textValue;
          remaining0 -= 1;
        }
      }
      if (remaining0 <= 0) {
        this._offset = index1;
        var klass3 = this.constructor.SyntaxNode;
        var type3 = find(this.constructor, "Symbol");
        address0 = new klass3(text0, this._offset, elements0);
        if (typeof type3 === "object") {
          extend(address0, type3);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["symbol"][index0] = address0;
    },
    __consume__delimiter: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["delimiter"] = this._nodeCache["delimiter"] || {};
      var cached = this._nodeCache["delimiter"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset;
      address0 = this.__consume__paren();
      if (address0) {
      } else {
        this._offset = index1;
        address0 = this.__consume__space();
        if (address0) {
        } else {
          this._offset = index1;
        }
      }
      return this._nodeCache["delimiter"][index0] = address0;
    },
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
    var result = this.__consume__program();
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

