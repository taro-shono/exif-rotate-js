# exif-rotate-js ・ [![CircleCI](https://circleci.com/gh/hanagejet/exif-rotate-js.svg?style=svg)](https://circleci.com/gh/hanagejet/exif-rotate-js)

When you use input file, you can get base64 string as array without worrying about `orientation` of exif.

## Usage

```
$ npm install exif-rotate-js
```

## API

```ts
const data = await getBase64Strings(files, {maxSize, type, quality}))
```

### Return Values

- a promise returning array string as base64 like `["data:image/jpeg;base64,/9j/4AAQS..."]`

### Parameters

- `files`: input target files. User can select multiple files.
- `maxSize = 720`: canvas max size. When image's width is greater than height, `maxSize` applies to width. And vice versa.
- `type = 'image/jpeg'`: the mime type of the generated image. Any mime type supported by [HTMLCanvasElement.toDataURL()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL#Syntax) is supported.
- `quality (optional)`: a number between `0` and `1` indicating the image quality to use for image formats that use lossy compression such as `image/jpeg` and `image/webp`. If this argument is anything else, the default value for image quality is used. As per the spec, the default (`undefined`) value will use `0.92`.

## Example

```js
import { getBase64Strings } from 'exif-rotate-js/lib';

const elem = document.getElementById('fileImage');

if (elem) {
  elem.onchange = async (e) => {
    if (!e.target) return;
    const data = await getBase64Strings(e.target.files, { maxSize: 1024 });
    console.log(data); // ["data:image/jpeg;base64,/9j/4AAQS..."] as type of Array
  };
}
```
