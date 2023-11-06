import { NodeType, parseFromString } from '../src';

describe('lastChild', () => {
  it('textNode as a child', () => {
    const html = `
    <div id="root">

        <div id="first"></div>
        <span id="last"></span>
    </div>`;

    const dom = parseFromString(html);
    const { lastChild } = dom.getElementById('root');

    expect(lastChild.nodeType).toEqual(NodeType.text);
  });

  it('elementNode as a child', () => {
    const html = `<div id="root"><div id="first"></div><span id="last"></span></div>`;

    const dom = parseFromString(html);
    const { lastChild } = dom.getElementById('root');

    expect(lastChild.getAttribute('id')).toEqual('last');
  });
});
