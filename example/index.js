import ExifRotate from '../lib/exif-rotate';

const elem = document.getElementById('file_image');
elem.onchange = (e) => {
  ExifRotate.getBase64String(e.target.files, {
    max_size: 700,
  }, (base64) => {
    console.log(base64);
  });

  ExifRotate.showPreviewImage(e.target.files, {
    max_size: 700,
  });
};
