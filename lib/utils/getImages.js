"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCanvasOptions = exports.getOrientation = exports.getSize = exports.getImages = void 0;
const EXIF = require("exif-js");
const readFile_1 = require("./readFile");
const readImage_1 = require("./readImage");
const options_1 = require("../options");
async function getImages(files) {
    const datas = await readFile_1.getDataFromReadFile(files);
    return await Promise.all(datas.map((item) => readImage_1.readImage(item)));
}
exports.getImages = getImages;
function getSize(width, height, maxSize = options_1.defaultOptions.maxSize) {
    const parseWidth = maxSize < width ? maxSize : width;
    const parseHeight = maxSize < height ? maxSize : height;
    if (width > height) {
        return {
            width: parseWidth,
            height: height * (parseWidth / width),
        };
    }
    if (height > width) {
        return {
            width: width * (parseHeight / height),
            height: parseHeight,
        };
    }
    return {
        width: parseWidth,
        height: parseHeight,
    };
}
exports.getSize = getSize;
function getOrientation(img) {
    let orientation = 1;
    // @ts-ignore not string: https://github.com/exif-js/exif-js/pull/198
    EXIF.getData(img, () => {
        orientation = EXIF.getTag(img, 'Orientation');
    });
    return orientation;
}
exports.getOrientation = getOrientation;
function getCanvasOptions(width, height, orientation) {
    const options = {
        translate: {
            x: 0,
            y: 0,
        },
        scale: {
            x: 1,
            y: 1,
        },
        rotate: {
            angle: 0,
        },
    };
    switch (orientation) {
        case 2:
            // horizontal flip
            return {
                ...options,
                translate: {
                    ...options.translate,
                    x: width,
                },
                scale: {
                    ...options.scale,
                    x: -1,
                },
            };
        case 3:
            // 180° rotate left
            return {
                ...options,
                translate: {
                    x: width,
                    y: height,
                },
                rotate: {
                    angle: Math.PI,
                },
            };
        case 4:
            // vertical flip
            return {
                ...options,
                translate: {
                    ...options.translate,
                    y: height,
                },
                scale: {
                    ...options.scale,
                    y: -1,
                },
            };
        case 5:
            // vertical flip + 90 rotate right
            return {
                ...options,
                scale: {
                    ...options.scale,
                    x: -1,
                },
                rotate: {
                    angle: (90 * Math.PI) / 180,
                },
            };
        case 6:
            // 90° rotate right
            return {
                ...options,
                translate: {
                    ...options.translate,
                    x: width,
                },
                rotate: {
                    angle: (90 * Math.PI) / 180,
                },
            };
        case 7:
            // horizontal flip + 90 rotate right
            return {
                ...options,
                translate: {
                    x: width,
                    y: height,
                },
                rotate: {
                    angle: (90 * Math.PI) / 180,
                },
                scale: {
                    ...options.scale,
                    y: -1,
                },
            };
        case 8:
            // 90° rotate left
            return {
                ...options,
                translate: {
                    ...options.translate,
                    y: height,
                },
                rotate: {
                    angle: -(90 * Math.PI) / 180,
                },
            };
        default:
            return options;
    }
}
exports.getCanvasOptions = getCanvasOptions;
