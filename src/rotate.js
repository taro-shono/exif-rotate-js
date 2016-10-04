import { setImage } from './helper';

export default class Rotate {
  /**
  *  @param options {object}
  *  elem_id: string
  *  max_size: number
  *  container_id: string
  */
  static changeFile(options = {}) {
    const elem = document.getElementById(options.elem_id);

    elem.onchange = (e) => {
      Object.keys(e.target.files).forEach((index) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImage(e.target.result, options);
        };
        reader.readAsDataURL(e.target.files[index]);
      });
    };
  }
}
