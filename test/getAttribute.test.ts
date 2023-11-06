import { parseFromString } from '../src';

test('Node.getAttribute', () => {
  const html =
    '<div id="outer" data-a ttt  =  "asd\'">\n' +
    '  <a id="inner" href="/search?field=123"></a>\n' +
    '</div>';

  const dom = parseFromString(html);
  const outer = dom.getElementById('outer');
  const inner = dom.getElementById('inner');

  expect(outer.attributes).toHaveLength(3);
  expect(outer.getAttribute('id')).toEqual('outer');
  expect(outer.getAttribute('data-a')).toEqual('');
  expect(outer.getAttribute('ttt')).toEqual("asd'");
  expect(outer.getAttribute('not-exists')).toEqual(null);
  expect(inner.getAttribute('href')).toEqual('/search?field=123');
});
