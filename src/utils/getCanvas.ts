import { EXIF } from 'exif-js';
import { getDataFromReadFile } from './readFile';
import { readImage } from './readImage';

interface canvasOptions {
  dx: number;
  dy: number;
  translate: {
    x: number;
    y: number;
  };
  scale: {
    x: number;
    y: number;
  };
  rotate: {
    angle: number;
  };
}

export async function getCanvas(files: Blob[]): Promise<string[] | undefined> {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) {
    // TODO: error handle
    return;
  }
  const datas = await getDataFromReadFile(files);
  const images = await Promise.all(
    datas.map(item => {
      return readImage(item);
    }),
  );
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
}

function getResizeCanvas(image: HTMLImageElement, orientation: number) {
  const width = orientation > 4 ? image.height : image.width;
  const height = orientation > 4 ? image.width : image.height;
  return {
    width,
    height,
  };
}

function getOrientation(img: HTMLImageElement): number {
  let orientation: number = 1;
  EXIF.getData(img, () => {
    orientation = EXIF.getTag(img, 'Orientation');
  });
  return orientation;
}

function getCanvasOptions(
  width: number,
  height: number,
  orientation: number,
): canvasOptions {
  const options: canvasOptions = {
    dx: 0,
    dy: 0,
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
