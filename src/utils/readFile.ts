export function readFile(file: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e: any) => resolve(e.target.result);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
}
