import TableView from "../../nju/view/TableView.js";
import TimeUtil from "../util/TimeUtil.js";

export default class TrackTableView extends TableView
{
    init()
    {
        super.init();
        this.addStyleClass("nm-track-table-view striped");
        this.$element.on("dblclick", this.getItemElementTag(), () => {
            this.trigger("selectiontrackchanged");
        });
    }

    $createNewItem()
    {
        const $tr = super.$createNewItem();
        $tr.append(`
            <td class="name"></td>
            <td class="artists"></td>
            <td class="album"></td>
            <td class="play-time"></td>
        `);
        return $tr;
    }


    renderItem(item, $item)
    {
        super.renderItem(item, $item);
        $item.children(".name").text(item.name);
        $item.children(".artists").text(item.artists.map(artist => artist.name).join(", "));
        $item.children(".album").text(item.album.name);
        const formatTime = TimeUtil.formatPlayTime(item.lMusic.playTime);
        $item.children(".play-time").text(formatTime);
    }

    renderHeadItem($item)
    {
        super.renderHeadItem($item);
        $item.children(".name").text("音乐标题");
        $item.children(".artists").text("歌手");
        $item.children(".album").text("专辑");
        $item.children(".play-time").text("时长");
    }


}
