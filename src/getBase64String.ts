import { readFile } from './utils/readFile';

async function getDataFromReadFile(files: Blob[]): Promise<string[]> {
  return await Promise.all(
    Array.from(files).map((file: Blob) => readFile(file)),
  );
}

export const getBase64String = async (files: Blob[]): Promise<string[]> => {
  const result = await getDataFromReadFile(files);
  return result;
};
