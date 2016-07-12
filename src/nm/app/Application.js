import NJUApplication from "../../nju/app/Application";

import PlayListView from "../view/PlayListView";
import TrackTableView from "../view/TrackTableView.js";
import PlayerView from "../view/PlayerView.js";

import ServiceClient from "../../nm/service/ServiceClient.js";

export default class Application extends NJUApplication
{
    init()
    {
        super.init();
        this.addStyleClass("nm-app");
        this._initLayout();
        this._initPlayListView();
        this._initTrackTableView();
        this._initPlayerView();
    }

    _initLayout()
    {
        this.$element.append(`
            <header><h1>网易云音乐</h1></header>
            <main>
                <aside class = "sidebar"></aside>
                <section class="content"></section>
            </main>
            <footer></footer>`);
    }

    _initPlayListView()
    {
        this.playListView = new PlayListView("play-list");
        this.addSubview(this.playListView, this.$("> main > aside.sidebar"));
    }

    _initTrackTableView()
    {
        this.trackTableView = new TrackTableView("track-table");
        this.addSubview(this.trackTableView, this.$("> main > section"));
    }

    _initPlayerView()
    {
        this.playerView = new PlayerView("player");
        this.addSubview(this.playerView, this.$("> footer"));
    }

    async run()
    {
        try {
            await ServiceClient.getInstance().login();//等待返回结果再继续执行
            this.playListView.items = await ServiceClient.getInstance().getUserPlayLists();

            const playlist = await ServiceClient.getInstance().getPlayListDetail(this.playListView.items[0].id);
            // console.log(playlist.tracks);
            this.trackTableView.items = playlist.tracks;
        } catch (e) {
            console.error(e);
        }
    }
}
