import { parseFromString } from '../src';

describe('getElementsByAttribute', () => {
  it('similar attribute names', () => {
    const html = `
        <form id="form">
          <input name="example" type="text"/><span>text</span>
          <span bad-name="example">text</span>
          <span name-similar="example">text</span>
          <div class="example"></div>
          <span>example</span>
        </form>`;

    const dom = parseFromString(html);
    const elements = dom.getElementsByAttribute('name', 'example');

    expect(elements).toHaveLength(1);
  });

  it('spaces and case', () => {
    const html = `
        <form id="form">
          <input name="example" type="text"/><span>text</span>
          <div class="example"></div>
          <span>example</span>
          <div class=" example"></div>
          <div class="  example">
             <input class="input" name="example">
             <input class="input" name="exaMple">
          </div>
          </div>
        </form>`;

    const dom = parseFromString(html);
    const elements = dom.getElementsByName('example');

    expect(elements).toHaveLength(2);
  });
});
