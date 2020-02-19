var
  tagRegExp          = /(<\/?[a-z][a-z0-9]*(?::[a-z][a-z0-9]*)?\s*(?:\s+[a-z0-9-_]+=(?:(?:'[\s\S]*?')|(?:"[\s\S]*?")))*\s*\/?>)|([^<]|<(?![a-z\/]))*/gi,
  attrRegExp         = /\s[a-z0-9-_]+\b(\s*=\s*('|")[\s\S]*?\2)?/gi,
  splitAttrRegExp    = /(\s[a-z0-9-_]+\b\s*)(?:=(\s*('|")[\s\S]*?\3))?/gi,
  startTagExp        = /^<[a-z]/,
  selfCloseTagExp    = /\/>$/,
  closeTagExp        = /^<\//,
  nodeNameExp        = /<\/?([a-z][a-z0-9]*)(?::([a-z][a-z0-9]*))?/i,
  attributeQuotesExp = /^('|")|('|")$/g,
  noClosingTagsExp   = /^(?:area|base|br|col|command|embed|hr|img|input|link|meta|param|source)/i,
  docTypeExp         = /^<\!DOCTYPE\s+(.+?)(?:\s+.*)?>/i;

var Node = require('./Node');

function findByRegExp(html, selector, onlyFirst) {

  var
    result        = [],
    tagsCount     = 0,
    tags          = html.match(tagRegExp),
    currentObject = null,
    matchingSelector, 
    fullNodeName,
    selfCloseTag,
    attributes,
    attrBuffer,
    attrStr,
    buffer,
    tag;

  var docNode = new Node({
    nodeType: 9,
    nodeName: '#document',
    childNodes: [],
    parentNode: null,
    selfCloseTag: false,
  });
  currentObject = docNode;

  for (var i = 0, l = tags.length; i < l; i++) {

    tag = tags[i];
    fullNodeName = tag.match(nodeNameExp);

    matchingSelector = selector.test(tag);

    if (startTagExp.test(tag)) {
      selfCloseTag = selfCloseTagExp.test(tag) || noClosingTagsExp.test(fullNodeName[1]);
      attributes = [];
      attrStr = tag.match(attrRegExp) || [];
      for (var aI = 0, aL = attrStr.length; aI < aL; aI++) {
        splitAttrRegExp.lastIndex = 0;
        attrBuffer = splitAttrRegExp.exec(attrStr[aI]);
        attributes.push({
          name: attrBuffer[1].trim(),
          value: (attrBuffer[2] || '').trim().replace(attributeQuotesExp, '')
        });
      }

      buffer = new Node({
        nodeType: 1, //element node
        nodeName: fullNodeName[1],
        namespace: fullNodeName[2],
        attributes: attributes,
        childNodes: [],
        parentNode: currentObject,
        startTag: tag,
        selfCloseTag: selfCloseTag
      });
      if (currentObject && currentObject.childNodes) {
        currentObject.childNodes.push(buffer);
      }
      tagsCount++;

      if (matchingSelector) {
        result.push(buffer);
      }

      if (selfCloseTag) {
        tagsCount--;
      }
      else {
        currentObject = buffer;
      }
    }
    else if (closeTagExp.test(tag)) {
      if (currentObject.nodeName == fullNodeName[1]){
        currentObject = currentObject.parentNode;
        tagsCount--;
      }
    }
    else if (docTypeExp.test(tag)) {
      currentObject.childNodes.push(new Node({
        nodeType: 10,
        nodeName: docTypeExp.exec(tag)[1],
        parentNode: currentObject
      }));
    }
    else {
      currentObject.childNodes.push(new Node({
        nodeType: 3,
        text: tag,
        parentNode: currentObject
      }));
    }

    if (tagsCount == 0) {
      currentObject = docNode;
    }
  }

  return onlyFirst ? result[0] || null : result;
}


function Dom(rawHTML) {
  this.rawHTML = rawHTML;
}

Dom.prototype.getElementsByClassName = function (className) {
  var selector = new RegExp('class=(\'|")(.*?\\s)?' + className + '(\\s.*?)?\\1');
  return findByRegExp(this.rawHTML, selector);
};

Dom.prototype.getElementsByTagName = function (tagName) {
  var selector = new RegExp('^<'+tagName, 'i');
  return findByRegExp(this.rawHTML, selector);
};

Dom.prototype.getElementById = function(id){
  var selector = new RegExp('id=(\'|")' + id + '\\1');
  return findByRegExp(this.rawHTML, selector, true);
};

Dom.prototype.getElementsByName = function(name){
    return this.getElementsByAttribute('name', name);
};

Dom.prototype.getElementsByAttribute = function(attr, value){
  var selector = new RegExp('\\s' + attr + '=(\'|")' + value + '\\1');
  return findByRegExp(this.rawHTML, selector);
};


module.exports = Dom;
