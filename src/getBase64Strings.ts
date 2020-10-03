import {
  getImages,
  getOrientation,
  getSize,
  getCanvasOptions,
} from './utils/getImages';
import { TOptions, defaultOptions } from './options';
import { getBrowserOrientation } from './utils/getBrowserOrientation';

export const getBase64Strings = async (
  files: Blob[],
  {
    maxSize = defaultOptions.maxSize,
    type = defaultOptions.type,
  }: TOptions = {},
): Promise<string[]> => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) {
    throw new Error('canvas can not created');
  }
  const images = await getImages(files);

  const hasBrowserOrientation = await getBrowserOrientation();
  if (hasBrowserOrientation) {
    const base64s = images.map((image) => {
      const { width, height } = getSize(image.width, image.height, maxSize);
      canvas.setAttribute('width', `${width}px`);
      canvas.setAttribute('height', `${height}px`);
      context.drawImage(image, 0, 0, width, height);
      return canvas.toDataURL(type);
    });
    return base64s;
  }

  const base64s = images.map((image) => {
    const orientation = getOrientation(image);
    const { width, height } = getSize(
      orientation > 4 ? image.height : image.width,
      orientation > 4 ? image.width : image.height,
      maxSize,
    );
    canvas.setAttribute('width', `${width}px`);
    canvas.setAttribute('height', `${height}px`);
    const { translate, scale, rotate } = getCanvasOptions(
      width,
      height,
      orientation,
    );
    context.translate(translate.x, translate.y);
    context.scale(scale.x, scale.y);
    context.rotate(rotate.angle);

    // exif orientation values > 4 correspond to portrait orientation.
    // width and height parameters must be swapped for landscape to ensure correct image display
    if (orientation > 4) {
      context.drawImage(image, 0, 0, height, width);
    } else {
      context.drawImage(image, 0, 0, width, height);
    }

    return canvas.toDataURL(type);
  });
  return base64s;
};
