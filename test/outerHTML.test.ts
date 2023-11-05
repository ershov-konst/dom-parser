import { parseFromString } from '../src';

it('outerHTML', () => {
  const html = `<div id="root">
        <div class="container">
          <span>
            <div class="broken">
              <div class="inner">1</div>
            </div>
          </span>
        </div>
      </div>`;

  const dom = parseFromString(html);
  const ctn = dom.getElementById('root');

  expect(ctn.outerHTML).toEqual(html);
});
