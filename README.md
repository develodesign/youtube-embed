# Youtube Embed
Takes a Youtube video ID on an element and adds a custom Play button ontop, when clicked it will embed, then autoplay the Youtube Player.
We reduce data usage by only creating and loading the data when we need to.

## Usage Options [None of these are required but allow for more customization]
```
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

## Or just for basic usage:
```
$('.myImageContainer').youtubeEmbed();
```

## Custom play button text and class example:
```
$('.myImageContainer').youtubeEmbed({
    buttonClass: 'myCustomClass',
    buttonText: 'Watch Me',
});
```
