import { parseFromString } from '../src';

describe('getElementById', () => {
  describe('getting an element by id', () => {
    const html = `
        <div id="root" class="examples">
          <span>text</span>
          <div class="example"></div>
          <span>text</span>
          <div id="example" class="example with id"></div>
          <div class="  example"></div>
          <span>text</span>
          <div class="exAmple    "></div>
          <span>text</span>
          <div class=" asd example ss"></div>
          <div class=" sd examples"></div>
          <span>text</span>
          <div class=" example as"
            <span id="nestedExample"></span>
          </div>
        </div>`;

    it('Dom', () => {
      const dom = parseFromString(html);
      const element = dom.getElementById('example');
      const notExistsElement = dom.getElementById('notExists');
      const nestedElement = dom.getElementById('nestedExample');

      expect(element).not.toBeNull();
      expect(nestedElement).not.toBeNull();
      expect(element.getAttribute('class')).toEqual('example with id');
      expect(notExistsElement).toBeNull();
    });
    it('Node', () => {
      const dom = parseFromString(html);
      const root = dom.getElementById('root');
      const element = root.getElementById('example');
      const nestedElement = root.getElementById('nestedExample');
      const notExistsElement = root.getElementById('notExists');

      expect(element).not.toBeNull();
      expect(nestedElement).not.toBeNull();
      expect(element.getAttribute('class')).toEqual('example with id');

      expect(notExistsElement).toBeNull();
    });
  });

  describe('getting only first element', () => {
    const html = `
        <div id="root" class="examples">
          <span>text</span>
          <div id="example" class="first example"></div>
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
              <div id="example" class="second example"></div>
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
                <span id="nestedExample"></span>
              </div>
            </div>
          </div>
        </div>`;

    it('Dom', () => {
      const dom = parseFromString(html);
      const element = dom.getElementById('example');
      const nestedElement = dom.getElementById('nestedExample');

      expect(element).not.toBeNull();
      expect(nestedElement).not.toBeNull();
      expect(element.getAttribute('class')).toEqual('first example');
    });

    it('Node', () => {
      const dom = parseFromString(html);
      const root = dom.getElementById('root');
      const element = root.getElementById('example');
      const nestedElement = root.getElementById('nestedExample');

      expect(element).not.toBeNull();
      expect(nestedElement).not.toBeNull();
      expect(element.getAttribute('class')).toEqual('first example');
    });
  });
});
