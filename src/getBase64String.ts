import { getCanvas } from './utils/getCanvas';

export const getBase64String = (files: Blob[]) => {
  return getCanvas(files);
};
