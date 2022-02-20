# File Parser

Simple file parser in nodejs

## Usage

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
