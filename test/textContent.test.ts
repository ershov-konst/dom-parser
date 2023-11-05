import { parseFromString } from '../src';

it('textContent', () => {
  const html = `<div id="root">
      <div class="container">
        some text
        <span>
          <div class="broken">
            <div class="inner"> 123 </div>
          </div>
        some text
        </span>
      </div>
    </div>`;

  const dom = parseFromString(html);
  const ctn = dom.getElementById('root');

  expect(ctn.textContent).toEqual('\n \n some text\n \n \n 123 \n \n some text\n \n \n ');
});
