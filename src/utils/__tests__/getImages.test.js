import { getSize } from '../getImages';
import { defaultOptions } from '../../options';

const MAX_SIZE = 200;
const GREATERE_WIDTH = {
  width: 100,
  height: 10,
};
const GREATERE_HEIGHT = {
  width: 10,
  height: 100,
};
const SAME_WIDTH_HEIGHT = {
  width: 100,
  height: 100,
};

describe('getSize()', () => {
  it('Should be return MAX_SIZE of width', () => {
    const { width, height } = GREATERE_WIDTH;
    expect(getSize(width, height, MAX_SIZE)).toEqual({
      width: MAX_SIZE,
      height: height * (MAX_SIZE / width),
    });
  });

  it('Should be return MAX_SIZE of height', () => {
    const { width, height } = GREATERE_HEIGHT;
    expect(getSize(width, height, MAX_SIZE)).toEqual({
      width: width * (MAX_SIZE / height),
      height: MAX_SIZE,
    });
  });

  it('Should be return MAX_SIZE of width and height', () => {
    const { width, height } = SAME_WIDTH_HEIGHT;
    expect(getSize(width, height, MAX_SIZE)).toEqual({
      width: MAX_SIZE,
      height: MAX_SIZE,
    });
  });

  it('Should be return width, height without argument of MAX_SIZE', () => {
    const { width, height } = GREATERE_WIDTH;
    const { maxSize } = defaultOptions;
    expect(getSize(width, height)).toEqual({
      width: maxSize,
      height: height * (maxSize / width),
    });
  });
});
