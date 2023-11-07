# dom-parser

Fast, tiny, zero-dependency DOM parser based on RegExps

![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/ershov-konst/dom-parser/bump-build-release.yml)
![Jest coverage](./badges/coverage-jest%20coverage.svg)
![npm](https://img.shields.io/npm/dw/dom-parser)
![GitHub](https://img.shields.io/github/license/ershov-konst/dom-parser)


## Installation

    npm install dom-parser

## Usage
```typescript
import { parseFromString } from 'dom-parser';

const html = await fs.readFileAsync('htmlToParse.html');

// Getting DOM model
const dom = parseFromString(html);

// Searching Nodes
const rootNode = dom.getElementById('rootNode');
const childNodes = rootNode.getElementsByClassName('childNodeClass');

```

## API

### Dom

#### Implemented methods

* getElementById
* getElementsByClassName
* getElementsByTagName
* getElementsByName

### Node

#### Implemented properties

* nodeType
* nodeName
* childNodes
* firstChild
* lastChild
* parentNode
* attributes
* innerHTML
* outerHTML
* textContent

#### Implemented methods

* getAttribute
* getElementById
* getElementsByClassName
* getElementsByTagName
* getElementsByName

Usage - https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement


## Contributing

Issues and pull requests are welcome!
