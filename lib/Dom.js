var
  tagRegExp          = /(<\/?[a-z][a-z0-9]*(?::[a-z][a-z0-9]*)?\s*(?:\s+[a-z0-9-_]+=(?:(?:'[\s\S]*?')|(?:"[\s\S]*?")))*\s*\/?>)|([^<]|<(?![a-z\/]))*/gi,
  attrRegExp         = /\s[a-z0-9-_]+\b(\s*=\s*('|")[\s\S]*?\2)?/gi,
  startTagExp        = /^<[a-z]/,
  selfCloseTagExp    = /\/>$/,
  closeTagExp        = /^<\//,
  nodeNameExp        = /<\/?([a-z][a-z0-9]*)(?::([a-z][a-z0-9]*))?/i,
  attributeQuotesExp = /^('|")|('|")$/g,
  noClosingTagsExp   = /area|base|br|col|command|embed|hr|img|input|link|meta|param|source/i;

var Node = require('./Node');

function findByRegExp(html, selector) {

  var
    result        = [],
    tagsCount     = 0,
    tags          = html.match(tagRegExp),
    composing     = false,
    currentObject = null,
    neededTagName,
    fullNodeName,
    attributes,
    attrBuffer,
    attrStr,
    buffer,
    tag;

  for (var i = 0, l = tags.length; i < l; i++) {

    tag = tags[i];
    fullNodeName = tag.match(nodeNameExp);

    if (!composing && selector.test(tag)) {
      composing = true;
      neededTagName = fullNodeName[1];
      tagsCount++;
    }

    if (composing) {

      if (startTagExp.test(tag)) {
        attributes = [];
        attrStr = tag.match(attrRegExp) || [];
        for (var aI = 0, aL = attrStr.length; aI < aL; aI++) {
          attrBuffer = attrStr[aI].split('=');
          attributes.push({
            name: attrBuffer[0].trim(),
            value: (attrBuffer[1] || '').trim().replace(attributeQuotesExp, '')
          });
        }

        ((currentObject && currentObject.childNodes) || result).push(buffer = new Node({
          nodeType: 1, //element node
          nodeName: fullNodeName[1],
          namespace: fullNodeName[2],
          attributes: attributes,
          childNodes: [],
          parentNode: currentObject,
          startTag: tag
        }));

        if (selfCloseTagExp.test(tag) || noClosingTagsExp.test(fullNodeName[1])) {
          if (fullNodeName[1] == neededTagName) {
            tagsCount--;
          }
        }
        else {
          currentObject = buffer;
        }

      }
      else if (closeTagExp.test(tag)) {
        currentObject.closeTag = tag;
        currentObject = currentObject.parentNode;

        if (fullNodeName[1] == neededTagName) {
          tagsCount--;
        }
      }
      else {
        currentObject.childNodes.push(new Node({
          nodeType: 3,
          text: tag,
          parentNode: currentObject
        }));
      }

      if (tagsCount == 0) {
        composing = false;
        currentObject = null;
      }

    }

  }

  return result;
}


function Dom(rawHTML) {
  this.rawHTML = rawHTML;
}

Dom.prototype.getElementsByClassName = function (className) {
  var selector = new RegExp('class=(\'|")(.*?\\s)?' + className + '(\\s.*?)?\\1', 'i');
  return findByRegExp(this.rawHTML, selector);
};


module.exports = Dom;