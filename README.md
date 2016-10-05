[![Build Status](https://travis-ci.org/hanagejet/exif-rotate-js.svg?branch=master)](https://travis-ci.org/hanagejet/exif-rotate-js)

# exif-rotate-js

When you use input file, you can see preview images.

## WHAT'S THIS MODULE

- preview on file upload images.
- use file API, correct to mobile.
- resize image's file size and size.

## HOW IT'S WORKS

```
npm install exif-rotate-js
```

```js
var ExifRotate = require('exif-rotate-js');
ExifRotate.showPreviewImage(img, {
  max_size: 700,
});
```

👆show detail `sample.js`

```html
<div id="{options.default_container_id}">
  here is uploaded images
</div>
<input type="file" id="#sum_id" multiple> <!-- can use multiple -->
```

## METHODS

| Name          | Argument | Description   |
| ------------- |:--------:|:-------------:|
| showPreviewImage  | img, Object   | Preview images |
| getBase64String   | img, Object   | Got encoding base 64 string |

## OPTIONS

See `lib/configs.js`

### max_size
- Type: number
- Default: 720

This is max image size.

### default_container_id
- Type: string
- Default: container

This is container element id.
