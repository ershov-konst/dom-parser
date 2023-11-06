import { NodeType, parseFromString } from '../src';

describe('firstChild', () => {
  it('textNode as a child', () => {
    const html = `
    <div id="root">

        <div id="first"></div>
        <span id="first"></span>
    </div>`;

    const dom = parseFromString(html);
    const { firstChild } = dom.getElementById('root');

    expect(firstChild.nodeType).toEqual(NodeType.text);
  });

  it('elementNode as a child', () => {
    const html = `<div id="root"><div id="first"></div><span id="first"></span></div>`;

    const dom = parseFromString(html);
    const { firstChild } = dom.getElementById('root');

    expect(firstChild.getAttribute('id')).toEqual('first');
  });

  it('empty', () => {
    const html = `<div id="root"></div>`;

    const dom = parseFromString(html);
    const { firstChild } = dom.getElementById('root');

    expect(firstChild).toBeNull();
  });
});
