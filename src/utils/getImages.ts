import * as EXIF from 'exif-js';
import { getDataFromReadFile } from './readFile';
import { readImage } from './readImage';
import { defaultOptions } from '../options';

interface canvasOptions {
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

export async function getImages(files: Blob[]): Promise<HTMLImageElement[]> {
  const datas = await getDataFromReadFile(files);
  return await Promise.all(datas.map((item) => readImage(item)));
}

export function getSize(
  width: number,
  height: number,
  maxSize: number = defaultOptions.maxSize,
) {
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

export function getOrientation(img: HTMLImageElement): number {
  let orientation: number = 1;
  // @ts-ignore not string: https://github.com/exif-js/exif-js/pull/198
  EXIF.getData(img, () => {
    orientation = EXIF.getTag(img, 'Orientation');
  });
  return orientation;
}

export function getCanvasOptions(
  width: number,
  height: number,
  orientation: number,
): canvasOptions {
  const options: canvasOptions = {
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
