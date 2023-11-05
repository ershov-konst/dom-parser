import { parseFromString } from '../src';

describe('getElementsByName', () => {
  describe('spaces and case', () => {
    const html = `
      <form id="form">
        <input name="example" type="text"/><span>text</span>
        <input name=" example" type="text"/>
        <div class="example"></div>
        <span>text</span>
        <div class=" example"></div>
        <div class="  example">
           <input class="input" name="example">
           <input class="input" name="exaMple">
           <input class="input" name="example ">
        </div>
        </div>
      </form>`;

    it('Dom', () => {
      const dom = parseFromString(html);
      const elements = dom.getElementsByName('example');

      expect(elements).toHaveLength(2);
    });

    it('Node', () => {
      const dom = parseFromString(html);
      const root = dom.getElementById('form');
      const elements = root.getElementsByName('example');

      expect(elements).toHaveLength(2);
    });
  });
});
