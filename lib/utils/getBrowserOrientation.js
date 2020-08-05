"use strict";
// Thanks JavaScript-Load-Image repo
// https://github.com/blueimp/JavaScript-Load-Image/blob/1e4df707821a0afcc11ea0720ee403b8759f3881/js/load-image-orientation.js#L37-L53
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBrowserOrientation = void 0;
const readImage_1 = require("./readImage");
async function getBrowserOrientation() {
    // black 2x1 JPEG, with the following meta information set:
    // EXIF Orientation: 6 (Rotated 90° CCW)
    const testImageURL = 'data:image/jpeg;base64,/9j/4QAiRXhpZgAATU0AKgAAAAgAAQESAAMAAAABAAYAAAA' +
        'AAAD/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBA' +
        'QEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQE' +
        'BAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/AABEIAAEAAgMBEQACEQEDEQH/x' +
        'ABKAAEAAAAAAAAAAAAAAAAAAAALEAEAAAAAAAAAAAAAAAAAAAAAAQEAAAAAAAAAAAAAAAA' +
        'AAAAAEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/8H//2Q==';
    const img = await readImage_1.readImage(testImageURL);
    // Check if browser supports automatic image orientation:
    return img.width === 1 && img.height === 2;
}
exports.getBrowserOrientation = getBrowserOrientation;
