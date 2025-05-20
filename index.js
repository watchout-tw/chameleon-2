const album = require('./controller/album.js')
const image = require('./controller/image.js')
require('dotenv').config()

exports.album = (req, res) => {
  const authToken = req.headers[process.env.NUXT_ENV_AUTH_NAME];
  switch(req.method) {
    case 'GET':
      if(!req.path) {
        album.getAlubumDetail(res, authToken)
      } else if(req.path == '/images') {
        album.getAlubumImages(res, authToken)
      } else {
        res.status(404).send('Not found');
      }
      break;
    case 'DELETE':
      if(req.path) {
        res.status(404).send('Not found');
      } else {
        album.deleteAlbum(res, req.path, authToken)
      }
      break;
    case 'POST':
      if(req.path) {
        res.status(404).send('Not found');
      } else {
        return album.createAlbum(res, authToken, req.body.title)
      }
      break;
    default:
      res.status(404).send('Not found');
  }
};

exports.image = (req, res) => {
  res.set('Access-Control-Allow-Origin', "*")
  const authToken = req.headers[process.env.NUXT_ENV_AUTH_NAME];
  switch(req.method) {
    case 'OPTIONS': {
      // Send response to OPTIONS requests
      res.set('Access-Control-Allow-Methods', 'GET, POST');
      res.set('Access-Control-Allow-Headers', 'Content-Type, watchout-auth');
      res.set('Access-Control-Max-Age', '3600');
      res.status(204).send('');
    }
    case 'POST':
      if(req.path === '/') {
        image.uploadImage(res, authToken, req.body)
      } else {
        res.status(404).send('Not found');
      }
      break;
    default:
      res.status(404).send('Not found');
  }
};

exports.iwaa = (req, res) => {
  switch(req.method){
    case 'GET':
      const imagesUrl = new RegExp('^\/[a-zA-Z0-9]+\.[a-zA-Z]+$');
      if(imagesUrl.test(req.path)) {
        res.writeHead(301, { Location: `${process.env.NUXT_ENV_IMGUR_IMAGE_URL}${req.path}` });
        res.end();
      } else {
        res.status(404).send('Not found');
      }
      break;
    default:
      res.status(404).send('Not found');
      break;
  }
};
