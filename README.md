# File Parser

Simple file parser in nodejs

## Usage

## To get the FileParser
```js
const FileParser = require('./file-parser');
const myParser = new FileParser();
```
### To  get all the available file formats
```js
const  fileFormats = myParser.fileTypes;
```
## Json
### You can parse json file with the parseJsonFile  method:
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
const jsonData = myParser.parseJsonFile('./example.json');
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
### You can also parse a json string with the parseJson  method:
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
const jsonData  = myParser.parseJson(jsonString); 

```
### You can check json syntax with checkJsonSyntax method:
```js
const isValidSyntax = myParser.checkJsonSyntax(jsonString); 
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

const jsonString = myParser.toJson(data);
const  minJsonString = myParser.toJson(data,true); 
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
    const isCreatedFile = parser.makeJsonFile(data,'./json/data.json'); // returns false  if something went wrong
    const isCreatedMinFile = parser.makeJsonFile(data,'./json/data.json',true);      
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
const cssData = myParser.parseCssFile('./style.css');
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

You can also give parse css string with the parseCss method:

```js
const cssString = `
      body{
          margin:10px;
          background:red;
      }
  `;
const cssData = myParser.parseCss(cssString);
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
body{margin:10px;background:red;}
```
### You can check css File syntax:
```js
    const isValidSyntax = myParser.checkCssSyntax(cssString); 
```
