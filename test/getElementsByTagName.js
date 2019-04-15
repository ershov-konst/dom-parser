describe('getting elements by tag name', function () {
  var
    chai = require('chai'),
    assert = chai.assert;

  var
    DomParser = require('../index.js'),
    parser = new DomParser();

  context('Dom', function(){
    it('divs and spans', function(){
      var html =
        '<div class="examples">\n' +
        '  <span>text</span>\n' +
        '  <div class="example"></div>\n' +
        '  <span>text</span>\n' +
        '  <div class=" example"></div>\n' +
        '  <div class="  example"></div>\n' +
        '  <span>text</span>\n' +
        '  <div class="exAmple    "></div>\n' +
        '  <span>text</span>\n' +
        '  <div class=" asd example ss"></div>\n' +
        '  <div class=" sd examples"></div>\n' +
        '  <span>text</span>\n' +
        '  <div class=" example as">' +
        '  </div>\n' +
        '</div>';

      var
        dom = parser.parseFromString(html),
        divs = dom.getElementsByTagName('div'),
        spans = dom.getElementsByTagName('span');

      assert.equal(divs.length, 8, 'html contains 8 elements with tagName "div"');
      assert.equal(spans.length, 5, 'html contains 5 elements with tagName "span"');
    });

    it('tags with separators', function(){
      var html =
        '<div class="examples root">\n' +
        '  <tip_link_head>\n' +
        '    <tip-link>foo</tip-link>\n' +
        '    <tip-link>foo</tip-link>\n' +
        '  </tip_link_head>\n' +
        '  <tip_link_head>\n' +
        '    <tip:link>bar</tip:link>\n' +
        '    <tip:link>bar</tip:link>\n' +
        '  </tip_link_head>\n' +
        '</div>';

      var
        dom = parser.parseFromString(html),
        tips_colon = dom.getElementsByTagName('tip:link'),
        tips_hyphen = dom.getElementsByTagName('tip-link'),
        tips_underline = dom.getElementsByTagName('tip_link_head');

      assert.equal(tips_colon.length, 2, 'html contains 2 elements with tagName "tip:link"');
      assert.equal(tips_hyphen.length, 2, 'html contains 2 elements with tagName "tip-link"');
      assert.equal(tips_underline.length, 2, 'html contains 2 elements with tagName "tip_link_head"');
    });
  });

  context('Node', function(){
    it('divs and spans', function(){
      var html =
        '<div class="examples root">\n' +
        '  <span>text</span>\n' +
        '  <div class="example"></div>\n' +
        '  <span>text</span>\n' +
        '  <div class=" example"></div>\n' +
        '  <div class="  example"></div>\n' +
        '  <span>text</span>\n' +
        '  <div class="exAmple    "></div>\n' +
        '  <span>text</span>\n' +
        '  <div class=" asd example ss"></div>\n' +
        '  <div class=" sd examples"></div>\n' +
        '  <span>text</span>\n' +
        '  <div class=" example as">' +
        '  </div>\n' +
        '</div>';

      var
        dom = parser.parseFromString(html),
        root = dom.getElementsByClassName('root')[0],
        divs = root.getElementsByTagName('div'),
        spans = root.getElementsByTagName('span');

      assert.equal(divs.length, 7, 'root element contains 8 elements with tagName "div"');
      assert.equal(spans.length, 5, 'root element contains 5 elements with tagName "span"');
    });
  });
});
