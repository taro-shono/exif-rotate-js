# exif-rotate-js ・ [![CircleCI](https://circleci.com/gh/hanagejet/exif-rotate-js.svg?style=svg)](https://circleci.com/gh/hanagejet/exif-rotate-js)

When you use input file, you can get base64 string as array without worrying about `orientation` of exif.

## Usage

```
$ npm install exif-rotate-js
```

## getBase64Strings(files, {maxSize, type})

### `return`

`return` is string of base64 array like `["data:image/jpeg;base64,/9j/4AAQS..."]`

### `files`

`files` is input target files. User can select multiple files.

### `maxSize`

default: 720

`maxSize` is canvas max size. When image's width is greater than height, `maxSize` applies to width. And vice versa.

### `type`

default: 'image/jpeg'

`type` is the mime type of the generated image. Any mime type supported by [HTMLCanvasElement.toDataURL()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL#Syntax) is supported.

## Example

```js
import { getBase64Strings } from 'exif-rotate-js/lib';

const elem = document.getElementById('fileImage');

if (elem) {
  elem.onchange = async e => {
    if (!e.target) return;
    const data = await getBase64Strings(e.target.files, { maxSize: 1024 });
    console.log(data); // ["data:image/jpeg;base64,/9j/4AAQS..."] as type of Array
  };
}
```
