import TrackList from "./view/TrackList.js"

$(main);
function main()
{
    const trackList = new TrackList();
    $(document.body).append(trackList.$element);
    $.ajax({
        url: "http://music.163.com/api/playlist/detail?id=99459881"
    }).then(res => {
        trackList.tracks = res.result.tracks;
    });
};
