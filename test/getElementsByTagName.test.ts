import { parseFromString } from '../src';

describe('getElementsByTagName', () => {
  describe('divs and spans', () => {
    const html = `
      <div id="root" class="examples">
        <span>text</span>
        <div class="example"></div>
        <span>text</span>
        <div class=" example"></div>
        <div class="  example"></div>
        <span>text</span>
        <div class="exAmple    "></div>
        <span>text</span>
        <div class=" asd example ss"></div>
        <div class=" sd examples"></div>
        <span>text</span>
        <div class=" example as">
        </div>
      </div>`;

    it('Dom', () => {
      const dom = parseFromString(html);
      const divs = dom.getElementsByTagName('div');
      const spans = dom.getElementsByTagName('span');

      expect(divs).toHaveLength(8);
      expect(spans).toHaveLength(5);
    });

    it('Node', () => {
      const dom = parseFromString(html);
      const root = dom.getElementById('root');
      const divs = root.getElementsByTagName('div');
      const spans = root.getElementsByTagName('span');

      expect(divs).toHaveLength(7);
      expect(spans).toHaveLength(5);
    });
  });

  describe('custom tags', () => {
    const html = `<div id="root" class="examples root">
          <tip_link_head>
            <tip-link>foo</tip-link>
            <tip-link>foo</tip-link>
          </tip_link_head>
          <tip_link_head>
            <tip:link>bar</tip:link>
            <tip:link>bar</tip:link>
          </tip_link_head>
        </div>`;

    it('Dom', () => {
      const dom = parseFromString(html);
      const tipsColon = dom.getElementsByTagName('tip:link');
      const tipsHyphen = dom.getElementsByTagName('tip-link');
      const tipsUnderline = dom.getElementsByTagName('tip_link_head');

      expect(tipsColon).toHaveLength(2);
      expect(tipsHyphen).toHaveLength(2);
      expect(tipsUnderline).toHaveLength(2);
    });

    it('Node', () => {
      const dom = parseFromString(html);
      const root = dom.getElementById('root');
      const tipsColon = root.getElementsByTagName('tip:link');
      const tipsHyphen = root.getElementsByTagName('tip-link');
      const tipsUnderline = root.getElementsByTagName('tip_link_head');

      expect(tipsColon).toHaveLength(2);
      expect(tipsHyphen).toHaveLength(2);
      expect(tipsUnderline).toHaveLength(2);
    });
  });
});
