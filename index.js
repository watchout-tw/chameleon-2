const config = require('./config/config.js')
const album = require('./controller/album.js')
const image = require('./controller/image.js')

exports.album = (req, res) => {
    const authToken = req.headers[config.auth.name];
    switch(req.method){
        case 'GET':
            if(!req.path){
                album.getAlubumDetail(res, authToken)
            }else if(req.path == '/images'){
                album.getAlubumImages(res, authToken)
            }else{
                res.status(404).send('Not found');
            }
            break;
        case 'DELETE':
            if(req.path){
                res.status(404).send('Not found');
            }else{
                album.deleteAlbum(res, req.path, authToken)
            }
            break;
        case 'POST':
            if(req.path){
                res.status(404).send('Not found');
            }else{
                return album.createAlbum(res, authToken, req.body.title)
            }
            break;
        default:
            res.status(404).send('Not found');
    }
};

exports.image = (req, res) => {
    const authToken = req.headers[config.auth.name];
    switch(req.method){
        case 'POST':
            if(!req.path){
                image.uploadImage(res, authToken, req.body)
            }else{
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
            if(imagesUrl.test(req.path)){
                res.writeHead(301,
                    {Location: `${config.imgur.imageUrl}${req.path}`}
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
