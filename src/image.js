export default class ImageDoc {
  static setImage(src) {
    const img = new Image();
    return new Promise((resolve, reject) => {
      img.onload = () => resolve(img);
      img.onerror = error => reject(error);
      img.src = src;
    });
  }

  static readFile(files) {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      Object.keys(files).forEach((index) => {
        reader.onload = e => resolve(e.target.result);
        reader.onerror = error => reject(console.log(error));
        reader.readAsDataURL(files[index]);
      });
    });
  }
}

export const {
  setImage,
  readFile,
} = ImageDoc;
