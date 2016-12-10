export default class ImageDoc {
  constructor() {
    this.setImage = this.setImage.bind(this);
    this.readFile = this.readFile.bind(this);
  }

  setImage(src) {
    const img = new Image();
    return new Promise((resolve, reject) => {
      img.onload = () => {
        return resolve(img);
      };
      img.onerror = (error) => {
        return reject(error);
      }
      img.src = src;
    });
  }

  readFile(files) {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      Object.keys(files).forEach((index) => {
        reader.onload = (e) => {
          return resolve(e.target.result);
        };

        reader.onerror = (error) => {
          return reject(console.log(error));
        };
        reader.readAsDataURL(files[index]);
      });
    });
  }
}
