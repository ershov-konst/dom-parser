import { parseFromString } from '../src';

describe('parentNode', () => {
  it('entire document', () => {
    const html = `
      <!-- Based on example.org -->
      <!doctype html>
      <html>
      <body>
      <div id="container">
          <h1>Example Domain</h1>
          <p>This domain is established to be used for illustrative examples in documents. You may use this
          domain in examples without prior coordination or asking for permission.</p>
          <p id="text"><a href="http://www.iana.org/domains/example">More information...</a></p>
      </div>
      </body>
      </html>`;

    const dom = parseFromString(html);
    const p = dom.getElementById('text');

    expect(p.textContent).toEqual('More information...');
    expect(p.parentNode.getAttribute('id')).toEqual('container');
  });

  it('fragment', () => {
    const html = `
      <div id="container">
          <h1>Example Domain</h1>
          <p>This domain is established to be used for illustrative examples in documents. You may use this
          domain in examples without prior coordination or asking for permission.</p>
          <p id="text"><a href="http://www.iana.org/domains/example">More information...</a></p>
          <div id="div"></div>
      </div>`;

    const dom = parseFromString(html);
    const text = dom.getElementById('text');
    const div = dom.getElementById('div');

    expect(text).not.toBeNull();
    expect(text.textContent).toEqual('More information...');
    expect(text.parentNode.getAttribute('id')).toEqual('container');

    expect(div).not.toBeNull();
    expect(div.parentNode.getAttribute('id')).toEqual('container');
  });
});
