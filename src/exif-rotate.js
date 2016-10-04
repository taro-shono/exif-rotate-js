import { setImage } from './helper';
import { file_id } from './configs';

export default class ExifRotate {
  /**
  *  @param options {object}
  *  elem_id: string
  *  max_size: number
  *  container_id: string
  */
  static onChangeFile(options = {}) {
    const id = options.file_id ? options.file_id : file_id;
    const elem = document.getElementById(id);

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
