import ExifRotate from './lib/exif-rotate';

const elem = document.getElementById('file_image');
elem.onchange = (e) => {
  Object.keys(e.target.files).forEach((index) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const base64 = ExifRotate.getBase64String(img, {
          max_size: 300,
        });
        console.log(base64);

        ExifRotate.showPreviewImage(img, {
          max_size: 700,
        });
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(e.target.files[index]);
  });
};
