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

  describe('tag names with similar nodeName', () => {
    const html = `<div id="root">
      <article>
        <a href='#'> Link </a>
      </article>
    </div>`;

    it('Dom', () => {
      const dom = parseFromString(html);
      const elements = dom.getElementsByTagName('a');

      expect(elements).toHaveLength(1);
      expect(elements[0].nodeName).toEqual('a');
    });

    it('Node', () => {
      const dom = parseFromString(html);
      const root = dom.getElementById('root');
      const elements = root.getElementsByTagName('a');

      expect(elements).toHaveLength(1);
      expect(elements[0].nodeName).toEqual('a');
    });
  });

  describe('starts with doctype', () => {
    const html = `<!doctype html>
    <html>
      <head></head>
      <body id="root">
        <a href='#'> Link </a>
      </body>
    </html>`;

    it('Dom', () => {
      const dom = parseFromString(html);
      const elements = dom.getElementsByTagName('head');
      expect(elements).toHaveLength(1);
    })

    it('Node', () => {
      const dom = parseFromString(html);
      const root = dom.getElementById('root');
      const elements = root.getElementsByTagName('a');

      expect(elements).toHaveLength(1);
      expect(elements[0].nodeName).toEqual('a');
    })

  })
});
