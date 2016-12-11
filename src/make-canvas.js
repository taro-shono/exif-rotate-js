import EXIF from 'exif-js';
import { max_size } from './configs';
import { setImage, readFile } from './image';

export default class makeCanvas {
  static init(files, options) {
    return new Promise((resolve) => {
      readFile(files)
      .then(file =>
        setImage(file)
        .then(img => resolve(getExifRotateCanvas(img, options)))
      );
    });
  }

  /**
  *  @param img {elem}
  *  @param canvas {elem}
  *  @param ctx {canvas obj}
  *  @param options {object}
  */
  static getResizeImage(img) {
    img.re_width = img.width;
    img.re_height = img.height;
    const orientation = getOrientation(img);
    if (orientation === 6) {
      // 縦画像だった場合スマートフォンでは幅・高さは横画像と認識されるため、 width height を手動で入れ替える必要あり
      img.re_height = img.width;
      img.re_width = img.height;
    }

    return img;
  }

  static getExifRotateCanvas(img, options) {
    const resizeCanvas = getResizeCanvas(getResizeImage(img), options);
    const ctx = resizeCanvas.getContext('2d');

    return getRotateCanvas(
      getOrientation(img),
      img,
      ctx,
      resizeCanvas
    );
  }

  /**
  *  draw image on canvas
  *  @param img {elem}
  */
  static getResizeCanvas(resizeImage, options) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const size = options.max_size ? options.max_size : max_size;

    if (resizeImage.re_width > resizeImage.re_height) {
      const resize = resizeImage.re_height * (size / resizeImage.re_width);
      canvas.width = size;
      canvas.height = resize;
      ctx.drawImage(resizeImage, 0, 0, size, resize);
      return canvas;
    } else if (resizeImage.re_height > resizeImage.re_width) {
      const resize = resizeImage.re_width * (size / resizeImage.re_height);
      canvas.width = resize;
      canvas.height = size;
      ctx.drawImage(resizeImage, 0, 0, resize, size);
      return canvas;
    }

    canvas.width = size;
    canvas.height = size;
    ctx.drawImage(resizeImage, 0, 0, size, size);
    return canvas;
  }

  /**
  *  get orientation for mobile
  *  @param img {elem}
  */
  static getOrientation(img) {
    let orientation;
    EXIF.getData(img, () => {
      orientation = EXIF.getTag(img, 'Orientation');
    });
    return orientation;
  }

  /**
  *  for mobile
  *  orientation があった場合に正しい角度で見せるように canvas を使って回転させる
  *  @param orientation {number}
  *  @param img {elem}
  *  @param ctx {canvas obj}
  *  @param canvas {elem}
  */
  static getRotateCanvas(orientation, img, ctx, canvas) {
    switch (orientation) {
      case 2:
        // horizontal flip
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        return canvas;
      case 3:
        // 180° rotate left
        ctx.translate(canvas.width, canvas.height);
        ctx.rotate(Math.PI);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        return canvas;
      case 4:
        // vertical flip
        ctx.translate(0, canvas.height);
        ctx.scale(1, -1);
        return canvas;
      case 5:
        // vertical flip + 90 rotate right
        ctx.rotate(0.5 * Math.PI);
        ctx.scale(1, -1);
        return canvas;
      case 6: {
        // 90° rotate right
        ctx.rotate(0.5 * Math.PI);
        ctx.translate(0, -canvas.height);
        const img_ratio = (img.re_height / img.re_width) - 1;
        ctx.drawImage(img, 0, canvas.width * img_ratio, canvas.height, canvas.width);
        return canvas;
      }
      case 7:
        // horizontal flip + 90 rotate right
        ctx.rotate(0.5 * Math.PI);
        ctx.translate(canvas.width, -canvas.height);
        ctx.scale(-1, 1);
        return canvas;
      case 8:
        // 90° rotate left
        ctx.rotate(-0.5 * Math.PI);
        ctx.translate(-canvas.width, 0);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        return canvas;
      default:
        return canvas;
    }
  }
}

export const {
  init,
  getExifRotateCanvas,
  getResizeImage,
  getCanvas,
  getOrientation,
  getResizeCanvas,
  getRotateCanvas,
} = makeCanvas;
