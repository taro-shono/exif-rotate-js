export function readFile(file: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e: any) => resolve(e.target.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

export async function getDataFromReadFile(files: Blob[]): Promise<string[]> {
  return await Promise.all(
    Array.from(files).map((file: Blob) => readFile(file)),
  );
}
