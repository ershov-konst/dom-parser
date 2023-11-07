import { parseFromString } from '../src';

it('innerHTML', () => {
  const html = `<div id="root">
        <div class="container">
          <span>
            <div class="broken">
              <div class="inner">1</div>
              <n:div>with namespace</n:div>
              <my-div>custom one</my-div>
              <br/>
            </div>
          </span>
        </div>
      </div>`;
  const inner = `<div class="container">
          <span>
            <div class="broken">
              <div class="inner">1</div>
              <n:div>with namespace</n:div>
              <my-div>custom one</my-div>
              <br/>
            </div>
          </span>
        </div>`;

  const dom = parseFromString(html);
  const ctn = dom.getElementById('root');

  expect(ctn.innerHTML).toEqualDom(inner);
});
