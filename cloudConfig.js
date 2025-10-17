// coopy from npm website in multer storage from Usage
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
// this is data config from .env
cloudinary.config({
  cloud_name:process.env.CLOUD_NAME,
  api_key:process.env.CLOUD_API_KEY,
  api_secret:process.env.CLOUD_API_SECRET

})  


//  / coopy from npm website in multer storage from Usage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'wanderlust_DEV',
           allowerdFormats :["png" , "jpg" , "jpeg"],  //format of file // supports promises as well
   
  },
});
const mapToken = process.env.MAP_TOKEN;

module.exports = {
  cloudinary,
  storage, 
  mapToken
}
