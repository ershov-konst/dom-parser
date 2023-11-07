import { parseFromString } from '../src';

describe('outerHTML', () => {
  it('exact html', () => {
    const html = `<div id="root">
        <div class="container">
          <span>
            <div class="wrapper">
              <div class="inner">1</div>
              <br/>
              <input type="text" disabled/>
              <n:div>with namespace</n:div>
              <my-div>custom one</my-div>
            </div>
          </span>
        </div>
      </div>`;

    const dom = parseFromString(html);
    const ctn = dom.getElementById('root');

    expect(ctn.outerHTML).toEqual(html);
  });
  it('auto closing tags', () => {
    const initialHtml = `<div id="root">
        <div class="container">
            <input type="text" disabled>
        </div>
      </div>`;
    const correctedHtml = `<div id="root">
        <div class="container">
            <input type="text" disabled/>
        </div>
      </div>`;

    const dom = parseFromString(initialHtml);
    const ctn = dom.getElementById('root');

    expect(ctn.outerHTML).toEqual(correctedHtml);
  });
});
