describe('doctype', function () {
  var
    chai = require('chai'),
    assert = chai.assert;

  var
    DomParser = require('../index.js'),
    parser = new DomParser();

  it('should handle doctype correctly', function(){
    var html =
      '<!DOCTYPE html>\n' +
      '<div id="root" />';

    var
      dom = parser.parseFromString(html),
      root = dom.getElementById('root');


      console.log(root.parentNode.firstChild.nodeName)
    assert.equal(root.parentNode.firstChild.nodeType, 10);
    assert.equal(root.parentNode.firstChild.nodeName, 'html');
  });
});

