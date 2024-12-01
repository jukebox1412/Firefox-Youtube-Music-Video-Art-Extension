# Youtube Music Video Extension TODO
## Build a method to switch from video to song image
1. To switch between them, you need to turn the song-video div display to 'none', and turn song-image div css to 'block'
   1. example: `song_image.style.setProperty("display", "block"); song_video.style.setProperty("display", "none")`
2. Set the song-image's img src to the thumbnail from youtube. 
   1. example `song_image_img.src = "https://img.youtube.com/vi/wKrb1q5hWWI/maxresdefault.jpg"` or `song_image_img.src = get_higher_quality_thumbnail`


## Build a method to switch from song image to video
1. To switch between them, you need to turn the song-video div display to 'none', and turn song-image div css to 'block'
   1. example: `song_image.style.setProperty("display", "none"); song_video.style.setProperty("display", "block")`

## Build a method to automatically change the song image when the song changes
TODO

## Nices to Haves
### Prevent switching if there is no video, automatically switch to song image


## Useful Javascript
### Get Song Image or Song Video 
``` javascript
document.getElementById("song-video")
document.getElementById("song-image")
```

### Set style of element
``` javascript
div.style.setProperty("display", "block")
```

### Log style of a element
``` javascript
style = window.getComputedStyle(div)
console.log(style.getPropertyValue("display"))
```

### Get the value of v= from the url
``` javascript
function getVFromParams() {
    const queryParams = new URLSearchParams(window.location.search);
    const params = {};

    for (const [key, value] of queryParams.entries()) {
        params[key] = value;
    }

    return params.v;
}
```

### Pull the image from the thumbnail
``` javascript
function get_higher_quality_thumbnail() {
    my_thumbnail = document.querySelector(".image")
    image_source = my_thumbnail.src

    image_source_without_stuff_after_equal = image_source.split('=')[0]
    return image_source_without_stuff_after_equal + "=w1000-h1000-l100-rj"
}
```

### Test run
``` javascript
function get_higher_quality_thumbnail() {
    var my_thumbnail = document.querySelector(".image")
    var image_source = my_thumbnail.src

    var image_source_without_stuff_after_equal = image_source.split('=')[0]
    return image_source_without_stuff_after_equal + "=w1000-h1000-l100-rj"
}

function display_song_image() {
    var song_video = document.getElementById("song-video")
    var song_image = document.getElementById("song-image")
    song_image.style.setProperty("display", "block"); 
    song_video.style.setProperty("display", "none")
}

function display_song_video() {
    var song_video = document.getElementById("song-video")
    var song_image = document.getElementById("song-image")
    song_image.style.setProperty("display", "none"); 
    song_video.style.setProperty("display", "block")
}

function set_song_image_thumbnail(image_source) {
    var song_image_img_element = document.querySelector("#thumbnail > img:nth-child(1)")
    song_image_img_element.src = image_source
}

var image_source = get_higher_quality_thumbnail()
display_song_image()
set_song_image_thumbnail(image_source)
```

### Listen for url changes
``` javascript
var previous_v = getVFromParams();
function getVFromParams() {
    const queryParams = new URLSearchParams(window.location.search);
    const params = {};

    for (const [key, value] of queryParams.entries()) {
        params[key] = value;
    }

    return params.v;
}

function monitor_for_song_changes() {
    setInterval(function()
    {
        current_v = getVFromParams()
        if (current_v){
            if (!previous_v)
            {
                previous_v = current_v
                // trigger
                console.log('song changed')
            }
            else if (previous_v != current_v) {
                previous_v = current_v
                // trigger
                console.log('song changed')
            }
        }
    }, 500);
}
monitor_for_song_changes()
```

## Test run 2
``` javascript
var previous_v = getVFromParams();
function getVFromParams() {
    const queryParams = new URLSearchParams(window.location.search);
    const params = {};

    for (const [key, value] of queryParams.entries()) {
        params[key] = value;
    }

    return params.v;
}

function monitor_for_song_changes() {
    setInterval(function()
    {
        current_v = getVFromParams()
        if (current_v){
            if (!previous_v)
            {
                previous_v = current_v
                get_song_image_from_thumbnail_and_set_as_image()
                console.log('song changed')
            }
            else if (previous_v != current_v) {
                previous_v = current_v
                get_song_image_from_thumbnail_and_set_as_image()
                console.log('song changed')
            }
        }
    }, 500);
}
function get_higher_quality_thumbnail() {
    var my_thumbnail = document.querySelector(".image")
    var image_source = my_thumbnail.src

    var image_source_without_stuff_after_equal = image_source.split('=')[0]
    return image_source_without_stuff_after_equal + "=w1000-h1000-l100-rj"
}

function display_song_image() {
    var song_video = document.getElementById("song-video")
    var song_image = document.getElementById("song-image")
    song_image.style.setProperty("display", "block"); 
    song_video.style.setProperty("display", "none")
}

function display_song_video() {
    var song_video = document.getElementById("song-video")
    var song_image = document.getElementById("song-image")
    song_image.style.setProperty("display", "none"); 
    song_video.style.setProperty("display", "block")
}

function set_song_image_thumbnail(image_source) {
    var song_image_img_element = document.querySelector("#thumbnail > img:nth-child(1)")
    song_image_img_element.src = image_source
}

function get_song_image_from_thumbnail_and_set_as_image() {
    var image_source = get_higher_quality_thumbnail()
    set_song_image_thumbnail(image_source)
}

var millisecondsToWait = 500;
display_song_image()
setTimeout(function() {
    get_song_image_from_thumbnail_and_set_as_image()
}, millisecondsToWait);

monitor_for_song_changes()
```