'use stirct';


class FileParser {
    #fs = require('fs');
    #path = require('path');
    #dirPath = this.#path.dirname(require.main.filename) + '/';
    #fileTypes = ['css', 'json'];
    constructor() {
        Object.freeze(this.fileTypes);
    }
    get fileTypes() {
        return this.#fileTypes;
    }
    parseCssFile(filePath)
    {
        const fileResult = this.#getFile(filePath);
        // if File not exists return error message
        if(fileResult.errorMessage) return fileResult;
        return this.parseCss(fileResult.data);
    }
    #getFile(filePath)
    {
        const result = { };
        try{
            result.data =  this.#fs.readFileSync(this.#dirPath + filePath).toString();
            
        }catch(e)
        {
            result.errorMessage = "File is not found!"; 
        }
        return result;
    }
    parseCss(cssInput) {
        const result = {};
        const data = cssInput;
        // Check Syntax
        const syntaxValidFlag = this.checkCssSyntax(data);
        if (!syntaxValidFlag) {
            result.errorMessage = 'Syntax error in the css file!';
            return result;
        }
        // Make parsing
        const filteredData = data.replace(/[\n\r]+/g, '');
        const cssBlocks = filteredData.split('}');
        for (const block of cssBlocks) {
            if (block === '') continue;
            const helperArr = block.split('{');
            const selector = helperArr[0];
            const rules = helperArr[1].replace(/[\n\s\r]/g, '').split(';');
            result[selector] = {};
            for (const rule of rules) {
                if (rule === '') continue;
                const helperArr = rule.split(':');
                const ruleName = helperArr[0];
                const ruleValue = helperArr[1];
                result[selector][ruleName] = ruleValue;
            }
        }
        return result;
    }
    toCss(cssData, minFlag = false) {
        let result = '';
        const keys = Object.keys(cssData);
        if (minFlag) {
            for (const key of keys) {
                result += key + '{';
                const ruleKeys = Object.keys(cssData[key]);
                for (const ruleKey of ruleKeys) {
                    result += `${ruleKey}:${cssData[key][ruleKey]};`;
                }
                result += '}';
            }
            return result;
        }
        for (const key of keys) {
            result += key + '{\n';
            const ruleKeys = Object.keys(cssData[key]);
            for (const ruleKey of ruleKeys) {
                result += `    ${ruleKey} : ${cssData[key][ruleKey]};\n`;
            }
            result += '}\n\n';
        }
        return result;
    }
    makeCssFile(cssData, fileUrl, minFile = false) {
        const cssString = this.toCss(cssData,minFile);
        try {
            const fullPath = this.#dirPath + '/' + fileUrl + (fileUrl.endsWith('.css') ? '' :'.css');
            this.#fs.writeFileSync(fullPath,cssString);
        } catch (e) {
            return false;
        }
        return true;
    }
    checkCssSyntax(cssData) {
        const filteredData = cssData.replace(/[\n\r\s ]/g, '');
        if (filteredData === '') return false;
        if (!this.#checkCssBrackets(filteredData)) return false;
        if (!this.#checkCssBlocks(filteredData)) return false;
        return true;
    }
    parseJsonFile(filePath)
    {
        const fileResult = this.#getFile(filePath);
        if(fileResult.errorMessage) return fileResult;
        return this.parseJson(fileResult.data);
    }
    parseJson(jsonInput) {
        const res = {};
        const jsonData = jsonInput.replace(/\s+(?=([^"]*"[^"]*")*[^"]*$)/gm, '');
        if (!jsonData) return null;
        if (!this.checkJsonSyntax(jsonData)) {
            res.errorMessage = 'Syntax error!';
            return res;
        }
        // Make parsing
        if (jsonData[0] === '[') {
            // Parse json  array
            return this.#parseJsonArray(jsonData);
        } else {
            // parse json object
            return this.#parseJsonObject(jsonData);
        }
    }
    checkJsonSyntax(jsonData) {
        const filteredData = jsonData.replace(/\s+(?=([^"]*"[^"]*")*[^"]*$)/gm, '');
        if (filteredData[0] === '[')
            // Array
            return this.#checkJsonArray(filteredData, '');
        else if (filteredData[0] === '{')
            // Object
            return this.#checkJsonObject(filteredData);
        else return false;
    }
    toJson(data,minify = true)
    {
        if(typeof data === 'object')
        {
            if(Array.isArray(data))
            {
                return this.#arrayToJson(data,minify,0);
            }else{
                return this.#objectToJson(data,minify,0);
            }
        }return false;
    }
    makeJsonFile(jsonInput,fileUrl,minFile = false)
    {

        const jsonData = this.toJson(jsonInput,minFile);
        if(!jsonData) return false;
        if(!this.checkJsonSyntax(jsonData)) return false;
        try{
            const fullPath = this.#dirPath + '/' + fileUrl + (fileUrl.endsWith('.json') ? '' :'.json');
            this.#fs.writeFileSync(fullPath,jsonData);
        }catch(e)
        {
            return false;
        }

        return true;
    }
    #arrayToJson(data,minify,tabNum)
    {
        if(minify) {
            return this.#arrayToMinJson(data);
         } let result =`[\n${this.#tabs(tabNum + 1)}`;
        for(let i = 0;i < data.length; i++)
        {
            const elem = data[i];
            if(typeof elem === 'object')
            {
                if(Array.isArray(elem))
                {
                    result += this.#arrayToJson(elem,minify,tabNum + 1);
                }else{
                    result += this.#objectToJson(elem,minify,tabNum + 1);
                }
            }else if(typeof elem === 'number')
            {
                result +=  elem;
            }else if(typeof elem === 'string')
            {
                result += `"${ elem }"`;
            }else return false;
            if(i !== data.length - 1) result += `,\n${ this.#tabs(tabNum + 1) }`;
        }

        result += `\n${this.#tabs(tabNum)}]`;
        return result;
    }
    #objectToJson(data,minify,tabNum)
    {
        if(minify)
            return this.#objectToMinJson(data);

        let result = `{\n ${this.#tabs(tabNum + 1)}`;
        const keys = Object.keys(data);
        for(let i = 0; i < keys.length; i++)
        {
            const key = keys[i];
            const elem = data[key];
            result += `"${ key }" : `;
            if(typeof  elem === 'object')
            {
                if(Array.isArray(elem))
                {
                    result += this.#arrayToJson(elem,minify,tabNum + 1);
                }else{
                    result += this.#objectToJson(elem,minify,tabNum + 1);
                }
            }else if(typeof elem === 'number')
            {
                result += elem;
            }else if(typeof elem === 'string')
            {
                result += `"${ elem }"`;
            }else return false;
            if(i !== keys.length - 1) result +=`,\n${ this.#tabs(tabNum + 1) }`;
        }
        result += `\n${ this.#tabs(tabNum) }}`;
        return result;
    }
    #arrayToMinJson(data)
    {
        let result = '[';
        for(let i = 0;i < data.length; i++)
        {
            const elem = data[i];
            if(typeof elem === 'object')
            {
                if(Array.isArray(elem))
                {
                    result += this.#arrayToMinJson(elem);
                }else{
                    result += this.#objectToMinJson(elem);
                }
            }else if(typeof elem === 'number')
            {
                result += elem;
            }else if(typeof elem === 'string')
            {
                result += `"${ elem }"`;
            }else return false;
            if(i !== data.length - 1) result += ',';
        }

        result +=  ']';
        return result;
    }
    #objectToMinJson(data)
    {
        let result = '{';
        const keys = Object.keys(data);
        for(let i = 0; i < keys.length; i++)
        {
            const key = keys[i];
            const elem = data[key];
            result += `"${ key }":`;
            if(typeof  elem === 'object')
            {
                if(Array.isArray(elem))
                {
                    result += this.#arrayToMinJson(elem);
                }else{
                    result += this.#objectToMinJson(elem);
                }
            }else if(typeof elem === 'number')
            {
                result += elem;
            }else if(typeof elem === 'string')
            {
                result += `"${ elem }"`;
            }else return false;
            if(i !== keys.length - 1) result +=',';
        }
        result += "}";
        return result;
    }
    #parseJsonArray(jsonArray) {
        const result = [];
        const arrayContent = jsonArray.slice(1, jsonArray.length - 1);
        const blocks = this.#getJsonBlocks(arrayContent);
        for (const block of blocks) {
            if (block[0] === '[') {
                result.push(this.#parseJsonArray(block));
            } else if (block[0] === '{') {

                result.push(this.#parseJsonObject(block));
            } else{
                const match = block.match(/([0-9]\d*(\.\d+)?|(?<=")[^"]*(?="))/gm);
                const parsedVal = parseFloat(match);
                result.push(Number.isNaN(parsedVal) ? match[0] : parsedVal);
            }
        }
        return result;
    }
    #parseJsonObject(jsonObject) {
        const result = {};
        const objectContent = jsonObject.slice(1, jsonObject.length - 1);
        const blocks = this.#getJsonBlocks(objectContent);
        for (const block of blocks) {
            if (block === '') continue;
            const firstColonIndex = this.#firstColonIndex(block);
            const name = block
                .substring(0, firstColonIndex)
                .match(/(?<=")[^"]*(?=")/)[0];
            const value = block.substring(firstColonIndex + 1);
            if (value[0] === '[') {
                result[name] = this.#parseJsonArray(value);
            } else if (value[0] === '{') {
                result[name] = this.#parseJsonObject(value);
            } else {
                const match = value.match(/([0-9]\d*(\.\d+)?|(?<=")[^"]*(?="))/gm);
                const realVal = match ? match[0] : '';
                const parsedVal = parseFloat(realVal);
                result[name] = Number.isNaN(parsedVal) ? realVal : parsedVal;
            }
        }

        return result;
    }
    #checkCssBrackets(filteredData) {
        let nextScope = '{';
        for (let index = 0; index < filteredData.length; index++) {
            const char = filteredData[index];
            if (char === '{') {
                if (nextScope === '{') nextScope = '}';
                else return false;
            } else if (char === '}') {
                if (nextScope === '}') nextScope = '{';
                else return false;
            }
        }
        if(nextScope === '}') return false;
        return true;
    }
    #checkCssBlocks(filteredData) {
        const cssBlocks = filteredData.split('}');
        for (const block of cssBlocks) {
            if (block === '') continue;
            const helperArr = block.split('{');
            const selector = helperArr[0];
            if (selector.replace(/[\s\r\n ]+/g, '') === '') return false;
            const rules = helperArr[1].split(';');
            for (let i = 0;i < rules.length; i++) {
                const rule = rules[i];
                if (rule === '' && i === rules.length - 1) return true;
                if (!rule.match(/^([a-zA-Z0-9\-#()]+:[a-zA-Z0-9\-#()%"]+)$/g))
                    return false;
            }
        }
        return true;
    }
    #checkJsonBrackets(jsonData) {
        // Remove all the chars except [,{,},]
        const brackets = jsonData.replace(/[^{}\[\]]+/g, '');
        const hash = {
            '{': '}',
            '[': ']',
        };
        if (brackets[0] === ']' || brackets[0] === '}') return false;
        const stack = [hash[brackets[0]]];
        for (let i = 1; i < brackets.length; i++) {
            const bracket = brackets[i];
            if (bracket === '[' || bracket === '{') {
                if (stack.length === 0) return false;
                stack.unshift(hash[bracket]);
                continue;
            }
            if (stack[0] === bracket) {
                stack.shift();
                continue;
            }
            return false;
        }
        if (stack.length) return false;
        return true;
    }
    #checkJsonArray(jsonArray) {
        if (!this.#checkJsonBrackets(jsonArray)) return false;
        const arrayContent = jsonArray.slice(1, jsonArray.length - 1);
        // check If array empty
        if (arrayContent === '') return true;
        // divide content to blocks
        const blocks = this.#getJsonBlocks(arrayContent);
        for (let i = 0; i < blocks.length; i++) {
            const block = blocks[i];
            if (block[0] === '[') {
                // Array control
                if (!this.#checkJsonArray(block)) return false;
            } else if (block[0] === '{') {
                // Object control
                if (!this.#checkJsonObject(block)) return false;
            } else {
                // Array element control
                if (!block.match(/^([1-9]\d*(\.\d+)?|"[^"]*")$/gm)) return false;
            }
        }

        return true;
    }
    #checkJsonObject(jsonObject) {
        if (!this.#checkJsonBrackets(jsonObject)) return false;
        const objectContent = jsonObject.slice(1, jsonObject.length - 1);
        // check is empty object
        if (objectContent === '') return true;
        // divide  blocks
        const blocks = this.#getJsonBlocks(objectContent);
        for (const block of blocks) {
            // Find first colon's index that not in quotes
            const firstColonIndex = this.#firstColonIndex(block);
            if (firstColonIndex < 2) return false;
            const name = block.substring(0, firstColonIndex);
            const value = block.substring(firstColonIndex + 1);
            if (!name.match(/^("[^"]*")$/gm)) return false;
            if (value[0] === '[') {
                // Json array control
                if (!this.#checkJsonArray(value)) return false;
            } else if (value[0] === '{') {
                // Json object check
                if (!this.#checkJsonObject(value)) return false;
            } else {
                if (!value.match(/^([1-9]\d*(\.\d+)?|"[^"]*")$/gm)) return false;
            }
        }

        return true;
    }
    #getJsonBlocks(jsonContent) {
        const bracketStack = [];
        const hash = {
            '{': '}',
            '[': ']',
        };
        let lastIndex = 0;
        const blocks = [];
        for (let i = 0; i < jsonContent.length; i++) {
            const char = jsonContent[i];
            if (char === '{' || char === '[') {
                bracketStack.unshift(hash[char]);
            } else if (char === '}' || char === ']') {
                bracketStack.shift();
            } else if (char === ',' && !bracketStack.length) {
                blocks.push(jsonContent.slice(lastIndex, i));
                lastIndex = i + 1;
            }
        }
        blocks.push(jsonContent.slice(lastIndex));
        return blocks;
    }
    #firstColonIndex(jsonObject) {
        let openedQuote = false;
        let firstColonIndex = 0;
        for (let i = 0; i < jsonObject.length; i++) {
            const char = jsonObject[i];
            if (char === '"') openedQuote = !openedQuote;
            else if (char === ':' && !openedQuote) {
                firstColonIndex = i;
                break;
            }
        }
        return firstColonIndex;
    }
    #tabs(number)
    {
        let res = '';
        for(let i = 0; i < number; i++)
        {
            res +='\t';
        }
        return res;
    }
}


module.exports = FileParser;