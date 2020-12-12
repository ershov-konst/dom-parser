var DOMPraser = require('../index');
const DOM = new DOMPraser
let data =  "<div id='h2' class='ha he' data='da'>dada</div><div id='h1' class='ha he'>ha he</div>"
console.log(DOM.parseFromString(data).getElementById('h2').classList)