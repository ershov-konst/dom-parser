import { Node, NodeType } from './Node';
import { NodeAttribute } from './NodeAttribute';

const tagRegExp =
  /(<\/?[a-z][a-z0-9]*(?::[a-z][a-z0-9]*)?\s*(?:\s+[a-z0-9-_]+=(?:(?:'[\s\S]*?')|(?:"[\s\S]*?")))*\s*\/?>)|([^<]|<(?![a-z/]))*/gi;
const attrRegExp = /\s[a-z0-9-_]+\b(\s*=\s*('|")[\s\S]*?\2)?/gi;
const splitAttrRegExp = /(\s[a-z0-9-_]+\b\s*)(?:=(\s*('|")[\s\S]*?\3))?/gi;
const startTagExp = /^<[a-z]/;
const selfCloseTagExp = /\/>$/;
const closeTagExp = /^<\//;
const textNodeExp = /^[^<]/;
const nodeNameExp = /<\/?([a-z][a-z0-9]*)(?::([a-z][a-z0-9]*))?/i;
const attributeQuotesExp = /^('|")|('|")$/g;
const noClosingTagsExp = /^(?:area|base|br|col|command|embed|hr|img|input|link|meta|param|source)/i;

export class Dom {
  rawHTML: string;

  constructor(rawHTML: string) {
    this.rawHTML = rawHTML;
  }

  private find(conditionFn: (node: Node) => boolean, findFirst?: boolean) {
    return find(this.rawHTML, conditionFn, findFirst);
  }

  getElementsByClassName(className: string) {
    return this.find((node) => node.getAttribute('class') === className);
  }

  getElementsByTagName(tagName: string) {
    return this.find((node) => node.nodeName === tagName);
  }

  getElementById(id: string) {
    return this.find((node) => node.getAttribute('id') === id, true);
  }

  getElementsByName(name: string) {
    return this.find((node) => node.getAttribute('name') === name);
  }

  getElementsByAttribute(attributeName: string, attributeValue: string) {
    return this.find((node) => node.getAttribute(attributeName) === attributeValue);
  }
}

// private

function find(html: string, conditionFn: (node: Node) => boolean, onlyFirst: boolean = false) {
  const generator = domGenerator(html);
  const result: Node[] = [];

  for (const node of generator) {
    if (node && conditionFn(node)) {
      if (onlyFirst) {
        return node;
      }
      result.push(node);
    }
  }
  return result;
}

function* domGenerator(html: string) {
  const tags = getAllTags(html);
  let cursor: Node | null = null;

  for (let i = 0, l = tags.length; i < l; i++) {
    const tag = tags[i];
    const isCloseTag = closeTagExp.test(tag);
    const node = createNode(tag, cursor);

    cursor = node || cursor;

    if (isCloseTag || cursor?.isSelfCloseTag) {
      yield cursor;

      cursor = cursor?.parentNode || null;
    }
  }
}

function getAllTags(html: string) {
  return html.match(tagRegExp) || [];
}

function createNode(tag: string, parentNode: Node | null) {
  const isTextNode = textNodeExp.test(tag);
  const isStartTag = startTagExp.test(tag);
  let node: Node | null = null;

  if (isTextNode) {
    node = createTextNode(tag, parentNode);
  }

  if (isStartTag) {
    node = createElementNode(tag, parentNode);
  }

  return node;
}

function createElementNode(tag: string, parentNode: Node | null) {
  const [nodeName, namespace] = tag.match(nodeNameExp) || [];
  const selfCloseTag = selfCloseTagExp.test(tag) || noClosingTagsExp.test(nodeName);
  const attributes = parseAttributes(tag);

  const elementNode = new Node({
    nodeType: NodeType.element,
    nodeName,
    namespace,
    attributes,
    childNodes: [],
    parentNode,
    selfCloseTag,
  });

  parentNode?.childNodes?.push(elementNode);
  return elementNode;
}

function parseAttributes(tag: string) {
  return (tag.match(attrRegExp) || []).map((attributeString) => {
    const [name = '', value = '']: string[] = splitAttrRegExp.exec(attributeString) || [];
    return new NodeAttribute({
      name: name.trim(),
      value: value.trim().replace(attributeQuotesExp, ''),
    });
  });
}

function createTextNode(text: string, parentNode: Node | null) {
  const textNode = new Node({
    nodeType: NodeType.text,
    nodeName: '#text',
    text,
    parentNode,
  });
  parentNode?.childNodes?.push(textNode);
  return textNode;
}
