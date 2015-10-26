//https://developer.mozilla.org/en-US/docs/Web/API/Element


function Node(cfg) {

  this.namespace = cfg.namespace || null;
  this.text = cfg.text;


  Object.defineProperties(this, {
    nodeType: {
      value: cfg.nodeType
    },
    nodeName: {
      value: cfg.nodeType == 1 ? cfg.nodeName : '#text' //todo: refactor this
    },
    childNodes: {
      value: cfg.childNodes
    },
    firstChild: {
      get: function(){
        return this.childNodes[0] || null;
      }
    },
    lastChild: {
      get: function(){
        return this.childNodes[this.childNodes.length-1] || null;
      }
    },
    parentNode: {
      value: cfg.parentNode || null
    },
    attributes: {
      value: cfg.attributes || []
    },
    innerHTML: {
      get: function(){
        var
          result = '',
          cNode;
        for (var i = 0, l = this.childNodes.length; i < l; i++) {
          cNode = this.childNodes[i];
          result += cNode.nodeType === 3 ? cNode.text : cNode.outerHTML();
        }
        return result;
      }
    }

  });
}

Node.prototype.getAttribute = function (attributeName) {
  for (var i = 0, l = this.attributes.length; i < l; i++) {
    if (this.attributes[i].name == attributeName) {
      return this.attributes[i].value;
    }
  }
  return null;
};

Node.prototype.getElementsByTagName = function (tagName) {
  var result = [];
  if (this.nodeType !== 3) {
    for (var i = 0, l = this.childNodes.length; i < l; i++) {
      if (this.childNodes[i].nodeName == tagName) {
        result.push(this.childNodes[i]);
      }
      result = result.concat(this.childNodes[i].getElementsByTagName(tagName));
    }
  }
  return result;
};

module.exports = Node;