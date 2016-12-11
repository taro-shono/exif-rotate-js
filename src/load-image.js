export default class LoadImage {
  static setImage(src) {
    const img = new Image();
    return new Promise((resolve, reject) => {
      img.onload = () => resolve(img);
      img.onerror = error => reject(error);
      img.src = src;
    });
  }

  static readFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = e => resolve(e.target.result);
      reader.onerror = error => reject(console.log(error));
      reader.readAsDataURL(file);
    });
  }
}

export const {
  setImage,
  readFile,
} = LoadImage;
