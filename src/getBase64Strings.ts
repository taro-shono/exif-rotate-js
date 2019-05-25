import {
  getImages,
  getOrientation,
  getResizeCanvas,
  getCanvasOptions,
} from './utils/getImages';

export const getBase64Strings = async (files: Blob[]) => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) {
    // TODO: error handle
    return false;
  }
  const images = await getImages(files);
  const base64s = images.map(image => {
    const orientation = getOrientation(image);
    const { width, height } = getResizeCanvas(image, orientation);
    canvas.setAttribute('width', `${width}px`);
    canvas.setAttribute('height', `${height}px`);
    const { dx, dy, translate, scale, rotate } = getCanvasOptions(
      canvas.width,
      canvas.height,
      orientation,
    );
    context.translate(translate.x, translate.y);
    context.scale(scale.x, scale.y);
    context.rotate(rotate.angle);
    context.drawImage(image, dx, dy);
    return canvas.toDataURL('image/jpeg');
  });
  return base64s;
};
