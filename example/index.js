import ExifRotate from '../lib/exif-rotate';
import Reader from '../lib/reader';
const reader = new Reader();

const elem = document.getElementById('file_image');
elem.onchange = (e) => {
  reader.getItem(e.target.files);
};
