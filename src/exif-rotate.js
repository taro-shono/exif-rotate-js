import { setCanvas, appendNewImage } from './helper';

export default class ExifRotate {
  /**
  *  @param img {elem}
  *  @param options {object}
  */
  static showPreviewImage(img, options = {}) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    setCanvas(img, canvas, ctx, options);
    appendNewImage(canvas, options);
  }

  /**
  *  @param img {elem}
  *  @param options {object}
  *  @return base 64 data url {string}
  */
  static getBase64String(img, options = {}) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    setCanvas(img, canvas, ctx, options);
    return canvas.toDataURL('image/jpeg');
  }
}
