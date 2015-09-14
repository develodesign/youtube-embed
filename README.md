# Youtube Embed
Takes a Youtube video ID on an element and adds a custom Play button ontop, when clicked it will embed, then autoplay the Youtube Player.
We reduce data usage by only creating and loading the data when we need to.

## Usage
```
$('.myImageContainer').youtubeEmbed({
    buttonText: 'Im Custom Button Text'
    /*onComplete: function() {
     // On completed state i can fire other events
     }*/
});
```

Or just for basic usage:
```
$('.myImageContainer').youtubeEmbed();
```