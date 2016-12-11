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

When you need detail, please see [example page](https://github.com/hanagejet/exif-rotate-js/tree/master/example).

## METHODS

### showPreviewImage

```js
showPreviewImage(file, options);
```

Can show preview image.

<img src="https://cloud.githubusercontent.com/assets/4067007/19226722/fc509f20-8e63-11e6-86a0-392a06ec887d.png" width="320">


### getBase64String

```js
getBase64String(file, options);
```

Can get base64 encode string.

<img src="https://cloud.githubusercontent.com/assets/4067007/19226758/92e519fc-8e64-11e6-8fd4-20556ae6dbb8.png" width="500">

### Arguments

| Name          | Type      | Description   |
| ------------- |:--------:|:-------------:|
| file          | fileList  | Just write event target files when input file event |
| options       | Object    | [Method options.](#options) |

### Options

See `src/configs.js`

### max_size
- Type: number
- Default: 720

This is max image size. Can get the size you want.

### default_container_id
- Type: string
- Default: container

This is container element id that is append preview image.
