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
ExifRotate.onChangeFile('{options}');
```

```html
<div id="container">{here_is_uploaded_images}</div>
<input type="file" id="{file_elem_id}" multiple>
```

## METHODS

| Name          | Argument | Description   |
| ------------- |:--------:|:-------------:|
| onChangeFile  | Object   | Preview images. Setting Options |

## OPTIONS

See `lib/configs.js`

### onChangeFile

#### file_id
- Type: string
- Default: null

#### max_size
- Type: number
- Default: 720

#### default_container_id
- Type: string
- Default: container
