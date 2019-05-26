import {
  getImages,
  getOrientation,
  getSize,
  getCanvasOptions,
} from './utils/getImages';
import { TOptions, defaultOptions } from './options';

export const getBase64Strings = async (
  files: Blob[],
  { maxSize = defaultOptions.maxSize }: TOptions = {},
): Promise<string[]> => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) {
    throw new Error('canvas can not created');
  }
  const images = await getImages(files);
  const base64s = images.map(image => {
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
    context.drawImage(image, 0, 0, width, height);
    return canvas.toDataURL('image/jpeg');
  });
  return base64s;
};
