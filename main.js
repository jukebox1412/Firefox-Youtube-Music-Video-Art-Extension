var previous_v = getVFromParams();
function getVFromParams()
{
    const queryParams = new URLSearchParams(window.location.search);
    const params = {};

    for (const [key, value] of queryParams.entries())
    {
        params[key] = value;
    }

    return params.v;
}

function monitor_for_song_changes()
{
    setInterval(function ()
    {
        current_v = getVFromParams()
        if (current_v)
        {
            if (!previous_v || previous_v != current_v)
            {
                previous_v = current_v
                get_song_image_from_thumbnail_and_set_as_image()
                console.log('song changed')
            }
        }
    }, 500);
}

function get_higher_quality_thumbnail()
{
    var my_thumbnail = document.querySelector(".image")
    var image_source = my_thumbnail.src

    var image_source_without_stuff_after_equal = image_source.split('=')[0]
    return image_source_without_stuff_after_equal + "=w544-h544-l90-rj"
}

function display_song_image()
{
    var song_video = document.getElementById("song-video")
    var song_image = document.getElementById("song-image")
    song_image.style.setProperty("display", "block");
    song_video.style.setProperty("display", "none")
}

function display_song_video()
{
    var song_video = document.getElementById("song-video")
    var song_image = document.getElementById("song-image")
    song_image.style.setProperty("display", "none");
    song_video.style.setProperty("display", "block")
}

function set_song_image_thumbnail(image_source)
{
    var song_image_img_element = document.querySelector("#thumbnail > img:nth-child(1)")
    song_image_img_element.src = image_source
}

function get_song_image_from_thumbnail_and_set_as_image()
{
    var image_source = get_higher_quality_thumbnail()
    set_song_image_thumbnail(image_source)
}

function switch_to_song_image()
{
    var millisecondsToWait = 1000;
    display_song_image()
    setTimeout(function ()
    {
        get_song_image_from_thumbnail_and_set_as_image()
    }, millisecondsToWait);
}

function main()
{
    switch_to_song_image();
    monitor_for_song_changes()
}

main()