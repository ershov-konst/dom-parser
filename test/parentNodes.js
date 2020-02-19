describe('parentNodes', function () {
  var
    chai = require('chai'),
    assert = chai.assert;

  var
    DomParser = require('../index.js'),
    parser = new DomParser();

  it('should return correct parent if has one', function(){
    var html =
      '<!DOCTYPE htm>\n' +
      '<div id="parent">\n' +
      '  <p>\n' +
      '    <p id="child">child</p>\n' +
      '  </p>\n' +
      '</div>';

    var
      dom = parser.parseFromString(html),
      child = dom.getElementById('child'),
      parent = child.parentNode.parentNode;

    assert.equal(child.getAttribute('id'), 'child');
    assert.equal(parent.getAttribute('id'), 'parent');
  });

  it('should return document node if it\'s root', function(){
    var html =
      '<div id="root">\n' +
      '</div>';

    var
      dom = parser.parseFromString(html),
      root = dom.getElementById('root'),
      parent = root.parentNode;

    assert.equal(parent.nodeType, 9);
  });
});

