import { getSize } from '../getImages';
import { defaultOptions } from '../../options';

const MAX_SIZE = 200;
const GREATER_MAXSIZE_WIDTH = {
  width: 3000,
  height: 10,
};
const GREATER_MAXSIZE_HEIGHT = {
  width: 10,
  height: 3000,
};
const GREATER_MAXSIZE_SAME_WIDTH_HEIGHT = {
  width: 3000,
  height: 3000,
};
const GREATER_WIDTH = {
  width: 100,
  height: 10,
};
const GREATER_HEIGHT = {
  width: 10,
  height: 100,
};
const SAME_WIDTH_HEIGHT = {
  width: 100,
  height: 100,
};

describe('getSize()', () => {
  it('Should be return MAX_SIZE of width', () => {
    const { width, height } = GREATER_MAXSIZE_WIDTH;
    expect(getSize(width, height, MAX_SIZE)).toEqual({
      width: MAX_SIZE,
      height: height * (MAX_SIZE / width),
    });
  });

  it('Should be return MAX_SIZE of height', () => {
    const { width, height } = GREATER_MAXSIZE_HEIGHT;
    expect(getSize(width, height, MAX_SIZE)).toEqual({
      width: width * (MAX_SIZE / height),
      height: MAX_SIZE,
    });
  });

  it('Should be return default size, when width is lower size than MAX_SIZE', () => {
    const { width, height } = GREATER_WIDTH;
    expect(getSize(width, height, MAX_SIZE)).toEqual({
      width,
      height,
    });
  });

  it('Should be return default size, when height is lower size than MAX_SIZE', () => {
    const { width, height } = GREATER_HEIGHT;
    expect(getSize(width, height, MAX_SIZE)).toEqual({
      width,
      height,
    });
  });

  it('Should be return of default size, when width and height are lower size than MAX_SIZE', () => {
    const { width, height } = SAME_WIDTH_HEIGHT;
    expect(getSize(width, height, MAX_SIZE)).toEqual({
      width,
      height,
    });
  });

  it('Should be return MAX_SIZE of width and height', () => {
    const { width, height } = GREATER_MAXSIZE_SAME_WIDTH_HEIGHT;
    expect(getSize(width, height, MAX_SIZE)).toEqual({
      width: MAX_SIZE,
      height: MAX_SIZE,
    });
  });

  it('Should be return default width and height without argument of MAX_SIZE', () => {
    const { width, height } = GREATER_WIDTH;
    expect(getSize(width, height)).toEqual({
      width,
      height,
    });
  });

  it('Should be return default MAX_SIZE without argument of MAX_SIZE', () => {
    const { width, height } = GREATER_MAXSIZE_WIDTH;
    const { maxSize } = defaultOptions;
    expect(getSize(width, height)).toEqual({
      width: maxSize,
      height: height * (maxSize / width),
    });
  });
});
