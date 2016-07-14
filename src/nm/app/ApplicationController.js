import NJUApplicationController from "../../nju/app/ApplicationController.js";

import Application from "./Application.js";

import ServiceClient from "../../nm/service/ServiceClient.js";

export default class ApplicationController extends NJUApplicationController
{
    createView()
    {
        const app = new Application();
        this.playListView = app.playListView;
        this.trackTableView = app.trackTableView;
        return app;
    }

    async run()
    {
        try {
            await ServiceClient.getInstance().login();//等待返回结果再继续执行
            this.playListView.items = await ServiceClient.getInstance().getUserPlayLists();
            this.playListView.selection = this.playListView.items[0];

            const playlist = await ServiceClient.getInstance().getPlayListDetail(this.playListView.items[0].id);
            // console.log(playlist.tracks);
            this.trackTableView.items = playlist.tracks;
        } catch (e) {
            console.error(e);
        }
    }
}
