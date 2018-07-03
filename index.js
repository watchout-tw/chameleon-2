const album = require('./controller/album.js')
const image = require('./controller/image.js')

exports.albums = (req, res) => {
    const getAlbumInfoUrl = new RegExp('^\/[a-zA-Z0-9]+$');
    const getAlbumImagesUrl = new RegExp('^\/[a-zA-Z0-9]+\/images$');
    switch(req.method){
        case 'GET':
            if(getAlbumInfoUrl.test(req.path)){
                album.getAlubumDetail(res, req.path)
            }else if(getAlbumImagesUrl.test(req.path)){
                album.getAlubumImages(res, req.path)
            }else{
                res.status(404).send('Not found');
            }
            break;
        case 'DELETE':
            if(getAlbumInfoUrl.test(req.path)){
                album.deleteAlbum(res, req.path, req.headers['watchout-auth'])
            }else{
                res.status(404);
            }
            break;
        case 'POST':
            if(req.path){
                res.status(404).send('Not found');
            }else{
                return album.createAlbum(res, req.headers['watchout-auth'])
            }
            break;
        default:
            res.status(404).send('Not found');
        break;
    }
};

exports.images = (req, res) => {
    switch(req.method){
    case 'POST':
        if(!req.path){
            image.uploadImage(res, req.headers['watchout-auth'], req.body)
        }else{
            res.status(404).send('Not found');
        }
        break;
    default:
        res.status(404).send('Not found');
        break;
    }
};

exports.iwaa = (req, res) => {
    switch(req.method){
    case 'GET':
        const imagesUrl = new RegExp('^\/[a-zA-Z0-9]+\.[a-zA-Z]+$');
        if(imagesUrl.test(req.path)){
            res.writeHead(301,
                {Location: `https://i.imgur.com${req.path}`}
            );
            res.end();
        }else{
            res.status(404).send('Not found');
        }
        break;
    default:
        res.status(404).send('Not found');
        break;
    }
};
