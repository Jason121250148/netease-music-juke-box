import NJUApplicationController from "../../nju/app/ApplicationController.js";

import Application from "./Application.js";

import ServiceClient from "../../nm/service/ServiceClient.js";

export default class ApplicationController extends NJUApplicationController
{
    init()
    {
        super.init();
        this._playLists = [];
        this._activePlayList = null;
        this._activeTrack = null;
    }


    get playLists()
    {
        return this._playLists;
    }
    set playLists(value)
    {
        this._playLists = value;
        this._onPlayListChanged();
    }


    get activePlayList()
    {
        return this._activePlayList;
    }
    set activePlayList(value)
    {
        if (this._activePlayList !== value)
        {
            this._activePlayList = value;
            this._onSelectedPlayListChanged();
        }
    }

    get activeTrack()
    {
        return this._activeTrack;
    }
    set activeTrack(value)
    {
        if (this._activeTrack !== value)
        {
            this._activeTrack = value;
            this._onSelectedTrackChanged();
        }
    }



    createApplication()
    {
        const app = new Application();
        this.playerView = app.playerView;
        this.playListView = app.playListView;
        this.searchView = app.searchView;
        this.trackTableView = app.trackTableView;

        this.playListView.on("selectionchanged", this._playListView_selectionchanged.bind(this));
        this.searchView.on("search", this._searchView_searchView.bind(this));
        this.trackTableView.on("selectiontrackchanged", this._trackTableView_selectiontrackchanged.bind(this));

        return app;
    }

    async run()
    {
        try {
            await ServiceClient.getInstance().login();//等待返回结果再继续执行
            await this._loadUserPlayList();

        } catch (e) {
            console.error(e);
        }
    }

    async _loadUserPlayList()
    {
        this.playLists = await ServiceClient.getInstance().getUserPlayLists();
        if (this.playLists.length > 0)
        {
            this.playListView.selection = this.playLists[0];
        }
    }




    _onPlayListChanged()
    {
        this.playListView.items = this.playLists;
    }

    _onSelectedPlayListChanged()
    {
        if (this._activePlayList.id === "search")
        {
            this.playListView.selectItem(null);
        }
        if (this._activePlayList)
        {
            this.trackTableView.items = this._activePlayList.tracks;
        }
        else {
            this.trackTableView.items = [];
        }
    }

    _onSelectedTrackChanged()
    {
        this.playerView.name = this._activeTrack;
    }

    async _playListView_selectionchanged(e)
    {
        if (this.playListView.selectedId)
        {
            const playList = await ServiceClient.getInstance().getPlayListDetail(this.playListView.selectedId);
            this.activePlayList = playList;
        }
    }

    _trackTableView_selectiontrackchanged(e)
    {
        this.activeTrack = this.trackTableView.selection;
    }

    async _searchView_searchView(e)
    {
        const results = await ServiceClient.getInstance().search(this.searchView.text);
        this.activePlayList = {
            id: "search",
            tracks: results.songs
        }
    }
}
