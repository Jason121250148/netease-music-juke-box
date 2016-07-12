import ListView from "./ListView.js";

export default class TableView extends ListView
{
    init()
    {
        super.init();
        this.removeStyleClass("nju-list-view");
        this.addStyleClass("nju-table-view");
        this._initLayout();
    }

    _initLayout()
    {
        this.$head = $(`<thead/>`);
        this.$headItem = this.$createHeadItem();
        this.renderHeadItem(this.$headItem);

        this.$head.append(this.$headItem);
        this.$element.append(this.$head);

        this.$contanier = $(`<tbody/>`);
        this.$element.append(this.$contanier);

    }

    getElementTag()
    {
        return "table";
    }

    renderHeadItem($headItem)
    {

    }

    $createHeadItem()
    {
        return this.$createNewItem();
    }

    $createNewItem(itemType = 0)
    {
        return $("<tr/>");
    }
}
