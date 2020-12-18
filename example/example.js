var DOMPraser = require('../index');
const DOM = new DOMPraser
let data =  `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
</body>
</html>`
console.log(DOM.parseFromString(data).querySelectorAll('meta'))