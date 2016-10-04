# exif-rotate-js

Simple use file API. You can use input file, show preview images.

## WHAT'S THIS MODULE

- preview on file upload images.
- use file API correct to mobile.

## HOW IT'S WORKS

```
npm install exif-rotate-js
```

```js
var ExifRotate = require('exif-rotate-js');
ExifRotate.onChangeFile('{file_elem_id}');
```

```html
<div id="container">{here_is_uploaded_images}</div>
<input type="file" id="{file_elem_id}" multiple>
```

## METHODS

| Name          | Argument | Description   |
| ------------- |:--------:|:-------------:|
| ChangeFile    | String   | Preview images. |

## FEATURED

- edit `#container` id name
- write max image size
