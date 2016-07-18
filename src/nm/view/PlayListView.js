import ListView from "../../nju/view/ListView";

export default class PlayListView extends ListView
{
    init()
    {
        super.init();
        this.addStyleClass("nm-play-list-view");
    }

    $createNewItem()
    {
        const $li = super.$createNewItem();
        $li.append(`
            <span class="icon icon-music iconfont"></span>
            <span class="text"></span>
        `);
        return $li;
    }

    renderItem(item, $item, modify)
    {
        super.renderItem(item, $item, modify);
        $item.children(".text").text(item.name);
    }
}
