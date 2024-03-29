# chameleon-2
Watchout image service with imgur and GCP cloud function



## How to use

[tutorial]: https://cloud.google.com/functions/docs/quickstart
[code]: index.js
1. [install GCP tool][tutorial].
2. Copy config/config.js.example to config/config.js. Fill it with your key.



## Deploy


Deploy iwaa API
```bash
gcloud functions deploy iwaa --runtime=nodejs12 --region=us-central1 --trigger-http
```
After deploying iwaa, set the url in config.iwaa.url direct to this function's url. Then the return value of image API can work.

Deploy album API
```bash
gcloud functions deploy album --runtime=nodejs12 --region=us-central1 --trigger-http
```
Deploy image API
```bash
gcloud functions deploy image --runtime=nodejs12 --region=us-central1 --trigger-http
```

Deploy scripts is also written in npm scripts.

## API

**Authorization**: For all of API of "Album" and "Image", you need to add access token named 'watchout-auth' to http headers. **The token determines whose album or image be operated.**

Example:
```json
{
  "headers": {
    "watchout-auth": "<your-token>"
  }
}
```

**Error message**: If any api is fail, they will response like:

```json
{
  "success": false,
  "message": "error message"
}
```


### Album

- POST /album
 
 Create an imgur album with title as user's handle. Only admin token can access this api.
 
 Input

| Key | Type | Description |
| --- | --- | --- |
| `title` | string | Album title. It is usually user's handle.|

Input example
```json
{
  "title": "watchout001"
}
```
  
Response example
```json
{
  "success": true,
  "album": "albumID"
}
```
  
- GET /album
  
Get album information
  
Response example
```json
{
  "success": true,
  "album": {
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
  }
}
```

- GET /album/images
 
Get all images infromation in an user's album.
  
Response example
```json
{
  "success": true,
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
}
```

- DELETE /album
  
Not open now.
  
### Image

- POST /image
  
Upload an image to an album
  
Input

| Key | Type | Description |
| --- | --- | --- |
| `image` | string | Image url or image base64 encode string. |
| `title` | string | **optional**. Image title. |
| `description` | string | **optional**. Image description. |

Input example
```json
{
  "image": "http://test.example.jpg",
  "title": "title",
  "description": "example"
}
```

Response example
```json
{
  "success": true,
  "image": "https://i.waa.tw/test.jpg"
}
```
