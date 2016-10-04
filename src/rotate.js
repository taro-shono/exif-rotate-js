import { setImage } from './helper';

export default class Rotate {
  static changeFile(elem_id) {
    const elem = document.getElementById(elem_id);

    elem.onchange = (e) => {
      Object.keys(e.target.files).forEach((index) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImage(e.target.result);
        };
        reader.readAsDataURL(e.target.files[index]);
      });
    };
  }
}
