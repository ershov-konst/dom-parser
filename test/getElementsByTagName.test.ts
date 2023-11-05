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
});
