export interface NodeAttributeProps {
  name: string;
  value: string;
}

export class NodeAttribute {
  name: string;

  value: string;

  constructor({ name, value }: NodeAttributeProps) {
    this.name = name;
    this.value = value;
  }
}
