// import TrackList from "./view/TrackList.js"
//
// $(main);
// function main()
// {
//     const trackList = new TrackList();
//     $(document.body).append(trackList.$element);
//     $.ajax({
//         url: "http://music.163.com/api/playlist/detail?id=99459881"
//     }).then(res => {
//         trackList.tracks = res.result.tracks;
//     });
// };



// import PlayListView from "./view/PlayListView.js";
// import Panel from "./panel/Panel.js";
import Application from "../nm/app/Application.js";

function main()
{
    // const playlist = new PlayListView("play-list");
    // const panel = new Panel("nm-panel");
    // panel.title = "Panel-Title";
    // panel.addSubView(playlist);
    // $(document.body).append(panel.$element);
    const app = new Application();
    app.placeAt(document.body);
    app.run();
}

$(main);
