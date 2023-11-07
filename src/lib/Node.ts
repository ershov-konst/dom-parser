// https://developer.mozilla.org/en-US/docs/Web/API/Node

import { NodeAttribute } from './NodeAttribute';

export enum NodeType {
  element = 1,
  text = 3,
}

interface NodeProps {
  nodeType: NodeType;
  namespace?: string;
  selfCloseTag?: boolean;
  text?: string;
  nodeName: string;
  childNodes?: Node[];
  parentNode: Node | null;
  attributes?: NodeAttribute[];
}

export class Node {
  namespace: string | null;

  nodeType: NodeType;

  text: string | null;

  nodeName: string;

  childNodes: Node[];

  parentNode: Node | null;

  attributes: NodeAttribute[];

  readonly isSelfCloseTag: boolean;

  constructor({
    nodeType,
    namespace,
    selfCloseTag,
    text,
    nodeName,
    childNodes,
    parentNode,
    attributes,
  }: NodeProps) {
    this.namespace = namespace || null;
    this.nodeType = nodeType;
    this.isSelfCloseTag = Boolean(selfCloseTag);
    this.text = text || null;
    this.nodeName = nodeType === NodeType.element ? nodeName : '#text';
    this.childNodes = childNodes || [];
    this.parentNode = parentNode;
    this.attributes = attributes || [];
  }

  get firstChild() {
    return this.childNodes[0] || null;
  }

  get lastChild() {
    return this.childNodes[this.childNodes.length - 1] || null;
  }

  get innerHTML() {
    return this.childNodes.reduce<string>(
      (html, node) => html + (node.nodeType === NodeType.text ? node.text : node.outerHTML),
      '',
    );
  }

  get outerHTML() {
    if (this.nodeType === NodeType.text) {
      return this.textContent;
    }

    const attributesString = stringifyAttributes(this.attributes);
    const openTag = `<${this.nodeName}${attributesString.length ? ' ' : ''}${attributesString}${
      this.isSelfCloseTag ? '/' : ''
    }>`;

    if (this.isSelfCloseTag) {
      return openTag;
    }

    const childs: string = this.childNodes.map((child) => child.outerHTML).join('');
    const closeTag = `</${this.nodeName}>`;

    return [openTag, childs, closeTag].join('');
  }

  get textContent(): string {
    if (this.nodeType === NodeType.text) {
      return this.text;
    }
    return this.childNodes
      .map((node) => node.textContent)
      .join('')
      .replace(/\x20+/g, ' ');
  }

  getAttribute(name: string) {
    const attribute = this.attributes.find((a) => a.name === name);
    return attribute ? attribute.value : null;
  }

  getElementsByTagName(tagName: string) {
    return searchElements(this, (elem) => elem.nodeName.toUpperCase() === tagName.toUpperCase());
  }

  getElementsByClassName(className: string) {
    const expr = new RegExp(`^(.*?\\s)?${className}(\\s.*?)?$`);
    return searchElements(this, (node) =>
      Boolean(node.attributes.length && expr.test(node.getAttribute('class') || '')),
    );
  }

  getElementsByName(name: string) {
    return searchElements(this, (node) =>
      Boolean(node.attributes.length && node.getAttribute('name') === name),
    );
  }

  getElementById(id: string) {
    return searchElement(this, (node) =>
      Boolean(node.attributes.length && node.getAttribute('id') === id),
    );
  }

  static ELEMENT_NODE = NodeType.element;

  static TEXT_NODE = NodeType.text;
}

// private
function searchElements(root: Node, conditionFn: (node: Node) => boolean): Node[] {
  if (root.nodeType === NodeType.text) {
    return [];
  }

  return root.childNodes.reduce<Node[]>((accumulator, childNode) => {
    if (childNode.nodeType !== NodeType.text && conditionFn(childNode)) {
      return [...accumulator, childNode, ...searchElements(childNode, conditionFn)];
    }
    return [...accumulator, ...searchElements(childNode, conditionFn)];
  }, []);
}

function searchElement(root: Node, conditionFn: (node: Node) => boolean): Node | null {
  for (let i = 0, l = root.childNodes.length; i < l; i++) {
    const childNode = root.childNodes[i];
    if (conditionFn(childNode)) {
      return childNode;
    }

    const node = searchElement(childNode, conditionFn);
    if (node) {
      return node;
    }
  }

  return null;
}

function stringifyAttributes(attributes: NodeAttribute[]) {
  return attributes.map((elem) => elem.name + (elem.value ? `="${elem.value}"` : '')).join(' ');
}
