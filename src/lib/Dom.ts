import { Node, NodeType } from './Node';
import { NodeAttribute } from './NodeAttribute';

const tagRegExp =
  /(<\/?(?:[a-z][a-z0-9]*:)?[a-z][a-z0-9-_.]*?[a-z0-9]*\s*(?:\s+[a-z0-9-_:]+(?:=(?:(?:'[\s\S]*?')|(?:"[\s\S]*?")))?)*\s*\/?>)|([^<]|<(?![a-z/]))*/gi;
const attrRegExp = /\s[a-z0-9-_:]+\b(\s*=\s*('|")[\s\S]*?\2)?/gi;
const splitAttrRegExp = /(\s[a-z0-9-_:]+\b\s*)(?:=(\s*('|")[\s\S]*?\3))?/gi;
const startTagExp = /^<[a-z]/;
const selfCloseTagExp = /\/>$/;
const closeTagExp = /^<\//;
const textNodeExp = /^[^<]/;
const nodeNameExp = /<\/?((?:([a-z][a-z0-9]*):)?(?:[a-z](?:[a-z0-9-_.]*[a-z0-9])?))/i;
const attributeQuotesExp = /^('|")|('|")$/g;
const noClosingTagsExp = /^(?:area|base|br|col|command|embed|hr|img|input|link|meta|param|source)/i;

export class Dom {
  rawHTML: string;

  constructor(rawHTML: string) {
    this.rawHTML = rawHTML;
  }

  private find(conditionFn: (node: Node) => boolean, findFirst: true): Node | null;
  private find(conditionFn: (node: Node) => boolean): Node[];
  private find(conditionFn: (node: Node) => boolean, findFirst?: boolean) {
    const result = find(this.rawHTML, conditionFn, findFirst);
    return findFirst ? result[0] || null : result;
  }

  getElementsByClassName(className: string) {
    const expr = new RegExp(`^(.*?\\s)?${className}(\\s.*?)?$`);
    return this.find((node) =>
      Boolean(node.attributes.length && expr.test(node.getAttribute('class') || '')),
    );
  }

  getElementsByTagName(tagName: string) {
    return this.find((node) => node.nodeName.toUpperCase() === tagName.toUpperCase());
  }

  getElementById(id: string): Node | null {
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
      result.push(node);
      if (onlyFirst) {
        return result;
      }
    }
  }
  return result;
}

function* domGenerator(html: string) {
  const tags = getAllTags(html);
  let cursor: Node | null = null;

  for (let i = 0, l = tags.length; i < l; i++) {
    const tag = tags[i];
    const node = createNode(tag, cursor);

    cursor = node || cursor;

    if (isElementComposed(cursor, tag)) {
      yield cursor;
      cursor = cursor.parentNode;
    }
  }

  while (cursor) {
    yield cursor;
    cursor = cursor.parentNode;
  }
}

function isElementComposed(element: Node | null, tag: string) {
  if (!tag) {
    return false;
  }
  const isCloseTag = closeTagExp.test(tag);
  const [, nodeName] = tag.match(nodeNameExp) || [];
  const isElementClosedByTag = isCloseTag && element.nodeName === nodeName;

  return isElementClosedByTag || element.isSelfCloseTag || element.nodeType === NodeType.text;
}

function getAllTags(html: string) {
  return html.match(tagRegExp) || [];
}

function createNode(tag: string, parentNode: Node | null): Node | null {
  const isTextNode = textNodeExp.test(tag);
  const isStartTag = startTagExp.test(tag);

  if (isTextNode) {
    return createTextNode(tag, parentNode);
  }

  if (isStartTag) {
    return createElementNode(tag, parentNode);
  }

  return null;
}

function createElementNode(tag: string, parentNode: Node | null) {
  const [, nodeName, namespace] = tag.match(nodeNameExp) || [];
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
    splitAttrRegExp.lastIndex = 0;
    const exec = splitAttrRegExp.exec(attributeString) || [];
    const [, name = '', value = '']: string[] = exec;
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
