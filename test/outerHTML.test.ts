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
  it('svg', () => {
    const svg = `<mask id="mask">
      <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#clip1"></use>
      <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#clip2"></use>
    </mask>`;

    const dom = parseFromString(svg);
    const ctn = dom.getElementById('mask');

    expect(ctn.outerHTML).toEqual(svg);
  });
});
