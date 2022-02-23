# File Parser

Simple file parser in nodejs

## Usage

## To get file parser
```js
const myParser = require('./file-parser');
```
### To  get all the available file formats
```js
const  fileFormats = myParser.fileTypes;
```
## Json
### You can parse json file with the parseJson  method:
exapmle.json 
```json
[
    {
        "name" : "Alex",
        "age"  : 28
    },
    {
        "name" : "Mark",
        "age"  : 22
    }
]
```
app.js
```js
const jsonData = myParser.parseJson('./example.json');
```
jsonData:
```js
    [
        {
            name : "Alex",
            age  : 28
        },
        {
            name  : "Mark",
            age   :  22 
        }
    ]
```
### You can also give a string to the parseJson  method:
```js
const jsonString = `[
    {
        "name" : "Alex",
        "age"  : 28
    },
    {
        "name" : "Mark",
        "age"  : 22
    }
]`;
const jsonData  = myParser.parseJson(jsonString,false); 

```
### You can check json syntax with checkJsonSyntax method:
```js
const isValidSyntax = myParser.checkJsonSyntax(jsonString); // only json String
```
### toJson method allows you  to parse JS Object and Array into JSON String :
```js
const data = {
    name:"Mark",
    age:22,
    adress:{
        country : "Ukraine",
        city    :  "Kiev",
    }
};

const jsonString = myParser.toJson(data,false);
const  minJsonString = myParser.toJson(data); 
```
jsonString :
```json
{
        "name" : "Mark",
        "age" : 22,
        "adress" : {
                "country" : "Ukraine",
                "city" : "Kiev"
        }
}
```
minJsonString :
```json
{"name":"Mark","age":22,"adress":{"country":"Ukraine","city":"Kiev"}}
```
### makeJsonFile method:
```js
    const isCreatedFile = parser.makeJsonFile(data,'./json/data.json',false); // returns false  if something went wrong
    const isCreatedMinFile = parser.makeJsonFile(data,'./json/data.json'); 
    const isCreatedFile2 = parser.makeJsonFile(jsonString,'json/data,json'); // can also pass string 
```


## Css
### For example you have to parse this css file into Javascript Object :

```css
body {
    margin: 10px;
    background: red;
}
```

You can do it via file parser :

```js
const myParser = new FileParser();
const cssData = myParser.parseCss('./style.css');
```

cssData :

```js
{
    body:{
        margin:"10px",
        background:"red",
    }
}
```

You can also give a css string to parseCss method:

```js
const cssString = `
      body{
          margin:10px;
          background:red;
      }
  `;
const cssData = myParser.parseCss(cssString, false);
```

### File parser can parse Javascript object into css string :

```js
const cssData = {
    body: {
        margin: '10px',
        background: 'red',
    },
};
const cssString = myParser.toCss(cssData);
const minCssString = myParser.toCss(cssData, true);
```

cssString :

```css
body {
    margin: 10px;
    background: red;
}
```

minCssString :

```css
body {
    margin: 10px;
    background: red;
}
```
### You can check css File syntax too:
```js
    const isValidSyntax = myParser.checkCssSyntax(cssString); // only css string
```
