import EXIF from 'exif-js';
import { max_size } from './configs/size';

export default class Helper {
  /**
  *  @param result_reader {string} base64 の string
  */
  static setImage(result_reader) {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      img.re_width = img.width;
      img.re_height = img.height;

      const orientation = getOrientation(img);

      if (orientation === 6) {
        // 縦画像だった場合スマートフォンでは幅・高さは横画像と認識されるため、 width height を手動で入れ替える必要あり
        img.re_height = img.width;
        img.re_width = img.height;
      }

      canvasResizeAndDrawImage(img, canvas, ctx);

      rotateFromOrientation(orientation, img, ctx, canvas);

      appendNewImage(canvas);
    };
    img.src = result_reader;
  }

  /**
  *  @param img {elem}
  *  @param canvas {elem}
  *  @param ctx {canvas obj}
  */
  static canvasResizeAndDrawImage(img, canvas, ctx) {
    if (img.re_width > img.re_height) {
      const resize = img.re_height * (max_size / img.re_width);
      canvas.width = max_size;
      canvas.height = resize;
      ctx.drawImage(img, 0, 0, max_size, resize);
    } else if (img.re_height > img.re_width) {
      const resize = img.re_width * (max_size / img.re_height);
      canvas.width = resize;
      canvas.height = max_size;
      ctx.drawImage(img, 0, 0, resize, max_size);
    } else {
      canvas.width = max_size;
      canvas.height = max_size;
      ctx.drawImage(img, 0, 0, max_size, max_size);
    }
  }

  /**
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
  *  #container に append
  *  @param canvas {elem}
  */
  static appendNewImage(canvas) {
    const base_64 = canvas.toDataURL('image/jpeg');
    const new_img = new Image();
    new_img.setAttribute('src', base_64);
    const container = document.getElementById('container');
    return container.appendChild(new_img);
  }

  /**
  *  for mobile
  *  orientation があった場合に正しい角度で見せるように canvas を使って回転させる
  *  @param orientation {number}
  *  @param img {elem}
  *  @param ctx {canvas obj}
  *  @param canvas {elem}
  */
  static rotateFromOrientation(orientation, img, ctx, canvas) {
    switch (orientation) {
      case 2:
        // horizontal flip
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        break;
      case 3:
        // 180° rotate left
        ctx.translate(canvas.width, canvas.height);
        ctx.rotate(Math.PI);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        break;
      case 4:
        // vertical flip
        ctx.translate(0, canvas.height);
        ctx.scale(1, -1);
        break;
      case 5:
        // vertical flip + 90 rotate right
        ctx.rotate(0.5 * Math.PI);
        ctx.scale(1, -1);
        break;
      case 6: {
        // 90° rotate right
        ctx.rotate(0.5 * Math.PI);
        ctx.translate(0, -canvas.height);
        const img_ratio = (img.re_height / img.re_width) - 1;
        ctx.drawImage(img, 0, canvas.width * img_ratio, canvas.height, canvas.width);
      }
        break;
      case 7:
        // horizontal flip + 90 rotate right
        ctx.rotate(0.5 * Math.PI);
        ctx.translate(canvas.width, -canvas.height);
        ctx.scale(-1, 1);
        break;
      case 8:
        // 90° rotate left
        ctx.rotate(-0.5 * Math.PI);
        ctx.translate(-canvas.width, 0);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        break;
      default:
        break;
    }
  }
}

export const {
  setImage,
  getOrientation,
  canvasResizeAndDrawImage,
  rotateFromOrientation,
  appendNewImages,
} = Helper;
