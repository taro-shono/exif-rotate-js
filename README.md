[![Build Status](https://travis-ci.org/hanagejet/exif-rotate-js.svg?branch=master)](https://travis-ci.org/hanagejet/exif-rotate-js)

# exif-rotate-js

When you use input file, you can see preview images.

## WHAT'S THIS MODULE

- preview on file upload images.
- use file API, correct to mobile.
- resize image's file size and size.

## HOW DOES IT WORK?

```
npm install exif-rotate-js
```

exmaple js

```js
var ExifRotate = require('exif-rotate-js');
ExifRotate.showPreviewImage(img, {
  max_size: 700,
});
```

example html

```html
<div id="${options.default_container_id}">
  here is uploaded images
</div>
<input type="file" id="#sum_id" multiple> <!-- can use multiple -->
```

## METHODS

### showPreviewImage

```js
showPreviewImage(img, options);
```

can show preview image.

like this:

<img src="https://cloud.githubusercontent.com/assets/4067007/19226722/fc509f20-8e63-11e6-86a0-392a06ec887d.png" width="320">


### getBase64String

```js
getBase64String(img, options);
```

can get base64 encode string.

like this console.log:

<img src="https://cloud.githubusercontent.com/assets/4067007/19226758/92e519fc-8e64-11e6-8fd4-20556ae6dbb8.png" width="500">


#### Arguments

| Name          | Type      | Description   |
| ------------- |:--------:|:-------------:|
| img           | node      | img element. `new Image();` |
| options       | Object    | [Method options.](#options) |

#### Options

See `lib/configs.js`

### max_size
- Type: number
- Default: 720

This is max image size.

### default_container_id
- Type: string
- Default: container

This is container element id.
