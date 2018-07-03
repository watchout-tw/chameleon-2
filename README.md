# chameleon-2
Watchout image service with imgur and GCP cloud function



## How to use

[tutorial]: https://cloud.google.com/functions/docs/quickstart
[code]: index.js
1. [install GCP tool][tutorial].
2. Copy config/config.js.example to config/config.js. Fill it with your key.



## Deploy



Deploy albums API
```bash
        gcloud beta functions deploy albums --trigger-http
```
Deploy images API
```bash
        gcloud beta functions deploy images --trigger-http
```

## API

**Authorization**: For all of API below, you need to add 'watchout-auth' to http headers, which value is watchout login access token.

Example:
```json=
headers: {
    'watchout-auth': <your-token>
}
```

**Error message**: If any api is fail, they will response like:

```json
headers: {
    "success": false,
    "message": "error message"
}
```


### Albums

- POST /albums
 
 Create an imgur album with title as user's handle
  
Response example
```json
{
    "success": true,
    "album": {
        "data": {
            "id": "<albumId>",
            "deletehash": "<album delete hash>"
        },
        "success": true,
        "status": 200
    }
}
```
  
- GET /albums/:id
  
Get album information by album id
  
TODO: Integrate with watchout-token. Token should contain album information, so that API path can be '/albums'
  
Response example
```json
{
    "success": true,
    "message": {
        "data": {
            "id": "",
            "title": "",
            "description": "",
            "datetime": 1530428256,
            "cover": "",
            "cover_width": 1,
            "cover_height": 1,
            "account_url": null,
            "account_id": null,
            "privacy": "hidden",
            "layout": "blog",
            "views": 0,
            "link": "https://imgur.com/a/id",
            "favorite": false,
            "nsfw": null,
            "section": null,
            "images_count": 1,
            "in_gallery": false,
            "is_ad": false,
            "include_album_ads": false,
            "images": [
                {
                    "id": "id",
                    "title": "title",
                    "description": "description",
                    "datetime": 1530428292,
                    "type": "image/jpeg",
                    "animated": false,
                    "width": 10,
                    "height": 10,
                    "size": 10,
                    "views": 2,
                    "bandwidth": 10,
                    "vote": null,
                    "favorite": false,
                    "nsfw": null,
                    "section": null,
                    "account_url": null,
                    "account_id": null,
                    "is_ad": false,
                    "in_most_viral": false,
                    "has_sound": false,
                    "tags": [],
                    "ad_type": 0,
                    "ad_url": "",
                    "in_gallery": false,
                    "link": "https://i.imgur.com/id.jpg"
                }
            ]
        },
        "success": true,
        "status": 200
    }
}
```

- GET /albums/:id/images
 
Get all images in an album by album id

TODO: Integrate with watchout-token. Token should contain album information, so that API path can be '/albums/images
  
Response example
```json
{
    "success": true,
    "message": {
        "data": [
            {
                "id": "id",
                "title": "title",
                "description": "description",
                "datetime": 1530428292,
                "type": "image/jpeg",
                "animated": false,
                "width": 10,
                "height": 10,
                "size": 10,
                "views": 2,
                "bandwidth": 10,
                "vote": null,
                "favorite": false,
                "nsfw": null,
                "section": null,
                "account_url": null,
                "account_id": null,
                "is_ad": false,
                "in_most_viral": false,
                "has_sound": false,
                "tags": [],
                "ad_type": 0,
                "ad_url": "",
                "in_gallery": false,
                "link": "https://i.imgur.com/id.jpg"
            }
        ],
        "success": true,
        "status": 200
    }
}
```

- DELETE /albums/:id 
  
Delete an album. It's is not OK. Who can do it?
  
### Images

- POST /images
  
Upload an image to Album
  
Input

| Key | Type | Description |
| --- | --- | --- |
| `image` | string | Image url or image base64 encode string. |
| `Album` | string | Album id. TODO: Like albums API, it should be integrated with watchout token |
| `title` | string | **optional**. Image title. |
| `description` | string | **optional**. Image description. |

Input example
```json
{
	"image": "http://test.example.jpg",
	"album": "albumid",
	"title": "title",
	"description": "example"
}
```

Response example
```js
{
    "success": true,
    "image": "image url" // TODO: with waa or pure imgur?
}
```
