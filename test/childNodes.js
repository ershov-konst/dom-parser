describe('childNodes', function () {
  var
    chai = require('chai'),
    assert = chai.assert;

  var
    DomParser = require('../index.js'),
    parser = new DomParser();

  it('should return correct childNodes', function(){
    var html =
      '<div id="parent">\n' +
      '  <p id="child1">child1</p>\n' +
      '  <p id="child2">child2</p>\n' +
      '  <p id="child3">child3</p>\n' +
      '  <p id="child4">child4</p>\n' +
      '</div>';

    var
      dom = parser.parseFromString(html),
      parent = dom.getElementById('parent');


    assert.equal(parent.childNodes[1].getAttribute('id'), 'child1');
    assert.equal(parent.childNodes[3].getAttribute('id'), 'child2');
    assert.equal(parent.childNodes[5].getAttribute('id'), 'child3');
    assert.equal(parent.childNodes[7].getAttribute('id'), 'child4');
  });

  it('should return correct firstChild and lastChild', function(){
    var html =
      '<div id="parent">' +
      '<p id="child1">child1</p>' +
      '<p id="child2">child2</p>' +
      '<p id="child3">child3</p>' +
      '<p id="child4">child4</p>' +
      '</div>';

    var
      dom = parser.parseFromString(html),
      parent = dom.getElementById('parent');

    assert.equal(parent.firstChild.getAttribute('id'), 'child1');
    assert.equal(parent.lastChild.getAttribute('id'), 'child4');
  });
});

