import { parseFromString } from '../src';

describe('getElementById', () => {
  describe('Dom', () => {
    it('getting an element by id', () => {
      const html = `
        <div class="examples">
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
          <div class=" example as
          </div>
        </div>`;

      const dom = parseFromString(html);
      const element = dom.getElementById('example');
      const notExistsElement = dom.getElementById('notExists');

      expect(element).not.toBeNull();
      expect(element.getAttribute('class')).toEqual('example with id');
      expect(notExistsElement).toBeNull();
    });

    it('getting only first element', () => {
      const html = `
        <div class="examples">
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
              </div>
            </div>
          </div>
        </div>`;

      const dom = parseFromString(html);
      const element = dom.getElementById('example');

      expect(element).not.toBeNull();
      expect(element.getAttribute('class')).toEqual('first example');
    });
  });

  describe('Node', () => {
    it('getting an element by id', () => {
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
          <div class=" example as">
          </div>
        </div>`;

      const dom = parseFromString(html);
      const root = dom.getElementById('root');
      const element = root.getElementById('example');
      const notExistsElement = root.getElementById('notExists');

      expect(element).not.toBeNull();
      expect(element.getAttribute('class')).toEqual('example with id');

      expect(notExistsElement).toBeNull();
    });

    it('getting only first element', () => {
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
              </div>
            </div>
          </div>
        </div>`;

      const dom = parseFromString(html);
      const root = dom.getElementById('root');
      const element = root.getElementById('example');

      expect(element).not.toBeNull();
      expect(element.getAttribute('class')).toEqual('first example');
    });
  });
});
