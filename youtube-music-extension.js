function getVFromParams()
{
    var queryParams = new URLSearchParams(window.location.search);
    if (queryParams)
        return queryParams.get("v");

    return null;
}

function monitor_for_song_changes()
{
    setInterval(function ()
    {
        var current_v = getVFromParams()
        if (current_v)
        {
            if (!previous_v || previous_v != current_v)
            {
                previous_v = current_v
                get_song_image_from_thumbnail_and_set_as_image()
            }
        }
    }, 500);
}

function get_higher_quality_thumbnail()
{
    var my_thumbnail = document.getElementsByClassName("image style-scope ytmusic-player-bar")[0]
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

function set_player_padding()
{
    var main_panel = document.getElementById("main-panel")
    main_panel.style.padding = "0px 151px";
}

function switch_to_song_image()
{
    var millisecondsToWait = 500;
    set_player_padding();
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

// wait for a little for stuff to catch up / load in
var millisecondsToWait = 500;
previous_v = null;
setTimeout(function ()
{
    previous_v = getVFromParams();
    main()
}, millisecondsToWait);
