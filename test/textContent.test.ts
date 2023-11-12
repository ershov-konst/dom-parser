import { parseFromString } from '../src';

describe('textContent', () => {
  it('composed', () => {
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

  it('xml', () => {
    const html = `<rss version="2.0">
    <channel>
        <item>
            <title>Example RSS</title>
        </item>
        <item>
            <title>Example RSS 2</title>
        </item>
        <item>
            <title>Example RSS 3</title>
        </item>
    </channel>`;

    const dom = parseFromString(html);
    const titles = dom.getElementsByTagName('title');

    expect(titles).toHaveLength(3);
    expect(titles[0].textContent).toEqual('Example RSS');
    expect(titles[1].textContent).toEqual('Example RSS 2');
    expect(titles[2].textContent).toEqual('Example RSS 3');
  });
});
