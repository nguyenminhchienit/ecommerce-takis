const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

const CLOUDINARY_NAME = "djypkcslk"
const CLOUDINARY_KEY= "178824123533554"
const CLOUDINARY_SECRET = "ZpjQbqNYV1hFDRv6SRuavso_P5c"


cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ['jpg', 'png'],
    params: {
      folder: 'Ecommerce_Takis'
  }
});

const uploadCloud = multer({ storage });

module.exports = uploadCloud;
