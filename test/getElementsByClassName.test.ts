import { parseFromString } from '../src';

describe('getElementsByClassName', () => {
  describe('spaces and case', () => {
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
      const elements = dom.getElementsByClassName('example');
      expect(elements).toHaveLength(5);
    });

    it('Node', () => {
      const dom = parseFromString(html);
      const root = dom.getElementById('root');
      const elements = root.getElementsByClassName('example');
      expect(elements).toHaveLength(5);
    });
  });

  describe('nested elements', () => {
    const html = `
      <div id="root" class="examples">
        <span>text</span>
        <div class="example"></div>
        <span>text</span>
        <div class=" example"></div>
        <div class="  example"></div>
        <span>text</span>
        <div class="example    "></div>
        <span>text</span>
        <div class=" asd example ss"></div>
        <div class=" sd examples"></div>
        <span>text</span>
        <div class=" example as nasted">
          <div class="examples">
            <span>text</span>
            <div class="example"></div>
            <span>text</span>
            <div class=" example"></div>
            <div class="  example"></div>
            <span>text</span>
            <div class="example    "></div>
            <span>text</span>
            <div class=" asd example ss"></div>
            <div class=" sd examples"></div>
            <span>text</span>
            <div class=" example as nasted">
            </div>
          </div>
        </div>
      </div>`;

    it('Dom', () => {
      const dom = parseFromString(html);
      const elements = dom.getElementsByClassName('example');

      expect(elements).toHaveLength(12);
    });

    it('Node', () => {
      const dom = parseFromString(html);
      const root = dom.getElementById('root');
      const elements = root.getElementsByClassName('example');

      expect(elements).toHaveLength(12);
    });
  });
});
