# dom-parser

Fast dom parser based on regexps

## installing

    npm install dom-parser

## usage

    var DomParser = require('dom-parser');
    var parser = new DomParser();

    fs.readFile('htmlToParse.html', 'utf8', function(err, html){
      if (!err){
        var dom = parser.parserFromString(html);

        console.log(dom.getElementById('myElement').innerHTML);
      }
    })

## API

##### Dom

Implemented methods:

* getElementsByClassName

##### Node

Implemented properties

* nodeType
* nodeName
* childNodes
* firstChild
* lastChild
* parentNode
* attributes
* innerHTML

Implemented methods

* getAttribute
* getElementsByTagName

Usage - https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement


## contributing

issues and pull requests are welcome!