export default class ImageDoc {
  constructor() {
    this.getItem = this.getItem.bind(this);
  }

  setItem(src) {
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

  getItem(src) {
    this.setItem(src)
    .then((img) => {
      return img;
    })
    .catch((error) => {
      console.log(error);
    });
  }
}
