# Youtube Embed
Takes a Youtube video ID on an element and adds a custom Play button ontop, when clicked it will embed, then autoplay the Youtube Player.
We reduce data usage by only creating and loading the data when we need to.

## Basic Usage
Create a container and an image inside, the plugin requires the image to have the following specific data-attribute on it 'data-youtube-id' where only the youtube video ID should be placed in it (Not the full URL).
#### Example container and image format
```html
<div class="myImageContainer"><img class="img-responsive" alt="myexampleimg" src="http://placehold.it/500" data-youtube-id="iNJdPyoqt8U" /></div>
```

#### Basic jQuery usage
```javascript
$('.myImageContainer').youtubeEmbed();
```

## Other Usage Options
#### None of these are required but allow for more customization]
```javascript
$('.myImageContainer').youtubeEmbed({
    buttonClass: 'btn btn-primary',
    buttonText: 'Play Video',
    autoplay: true,
    autoPosition: true,
    width: 560,
    height: 315,
    /*onComplete: function() {
     // On completed state i can fire other events
     }*/
});
```

#### Or just for basic usage:
```javascript
$('.myImageContainer').youtubeEmbed();
```

#### Custom play button text and class example:
```javascript
$('.myImageContainer').youtubeEmbed({
    buttonClass: 'myCustomClass',
    buttonText: 'Watch Me',
});
```
