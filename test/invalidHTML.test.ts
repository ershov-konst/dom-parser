import { parseFromString } from '../src';

describe('invalid html', () => {
  it('unclosed tag', () => {
    const invalidHTML = `<div id="root">
        <div class="container">
          <span>
            <div class="broken">
              <div class="inner">1</div>
          </span>
        </div>
      </div>`;
    const validHTML = `<div id="root">
        <div class="container">
          <span>
            <div class="broken">
              <div class="inner">1</div>
            </div>
          </span>
        </div>
      </div>`;

    const dom = parseFromString(invalidHTML);
    const ctn = dom.getElementById('root');

    expect(ctn.outerHTML).toEqualDom(validHTML);
  });

  it('excess closing tag', () => {
    const invalidHTML = `<div id="root">
        <span>
          <div class="broken">
            <div class="inner">1</div>
          </div>
          </div>
        </span>
        <span>
          <div class="broken">
            <div class="inner">1</div>
          </div>
          </div>
        </span>
      </div>`;
    const validHTML = `<div id="root">
        <span>
          <div class="broken">
            <div class="inner">1</div>
          </div>
        </span>
        <span>
          <div class="broken">
            <div class="inner">1</div>
          </div>
        </span>
      </div>`;

    const dom = parseFromString(invalidHTML);
    const ctn = dom.getElementById('root');

    expect(ctn.outerHTML).toEqualDom(validHTML);
  });
});
