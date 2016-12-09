import ImageDoc from './image';
const image_doc = new ImageDoc();

export default class Reader {
  constructor() {
    this.getItem = this.getItem.bind(this);
  }

  setItem(files) {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = (e) => {
        return resolve(image_doc.getItem(e.target.result));
      };

      reader.onerror = (error) => {
        return reject(error);
      }

      reader.readAsDataURL(files)
    });
  }

  getItem(files) {
    Object.keys(files).forEach((index) => {
      this.setItem(files[index]);
    });
  }
}
