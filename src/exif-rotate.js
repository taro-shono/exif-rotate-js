import { setCanvas, appendNewImage } from './make-canvas';

export default class ExifRotate {
  /**
  *  @param img {elem}
  *  @param options {object}
  */
  static showPreviewImage(files, options = {}) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    setCanvas(files, canvas, ctx, options)
    .then(() => {
      appendNewImage(canvas, options);
    })
    .catch(() => {
      console.log('not working showPreviewImage');
    });
  }

  /**
  *  @param img {elem}
  *  @param options {object}
  *  @return base 64 data url {string}
  */
  static getBase64String(files, options = {}, callback) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    setCanvas(files, canvas, ctx, options)
    .then(() => {
      callback(canvas.toDataURL('image/jpeg'));
    })
    .catch(() => {
      console.log('not working getBase64String');
    });
  }
}
