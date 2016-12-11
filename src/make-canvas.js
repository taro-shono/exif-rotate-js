import EXIF from 'exif-js';
import { max_size } from './configs';
import { setImage, readFile } from './load-image';

export default class makeCanvas {
  /**
  *  get canvas after read file
  *  @param files {fileList}
  *  @return promise {func}
  */
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
  *  insert resize variable to image
  *  @param img {elem}
  *  @return img {elem}
  */
  static getResizeImage(img) {
    img.re_width = img.width;
    img.re_height = img.height;
    const orientation = getOrientation(img);
    if (orientation === 6) {
      // it is necessary to manually replace width and height for mobile
      img.re_height = img.width;
      img.re_width = img.height;
    }

    return img;
  }

  /**
  *  get resize and rotate canvas
  *  @param img {elem}
  *  @param options {object}
  *  @return canvas {elem}
  */
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
  *  get canvas to designate size from original size
  *  @param resizeImage {elem}
  *  @param options {object}
  *  @returns canvas {elem}
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
  *  @return orientation {number}
  */
  static getOrientation(img) {
    let orientation;
    EXIF.getData(img, () => {
      orientation = EXIF.getTag(img, 'Orientation');
    });
    return orientation;
  }

  /**
  *  get rotate canvas for mobile
  *  @param orientation {number}
  *  @param img {elem}
  *  @param ctx {canvas obj}
  *  @param canvas {elem}
  *  @returns canvas {elem}
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
