import { Dom } from './lib/Dom';

export function parseFromString(html: string) {
  return new Dom(html);
}

export * from './lib/Dom';
export * from './lib/Node';
