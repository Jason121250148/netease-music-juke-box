import View from "./View";

export default class PlayListView extends View
{
    init()
    {
        super.init();
        this._items = null;
        this._$itemTemplates = [];
        this.addStyleClass("nju-list-view");
    }

    getElementTag()
    {
        return "ul";
    }

    get items()
    {
        return this._items;
    }

    set items(value)
    {
        this.clearItems();
        this.addItems(value);

    }

    getTypeOfItem(item)
    {
        return 0;
    }

    clearItems()
    {
        if (this.items !== null)
        {
            if (this.items.length > 0)
            {
                this._items.splice(0, this._items.length);
                this.$contanier.children(this.getItemElementTag()).remove();
            }
            else {

            }
        }
        else {
            this._items = [];
        }
    }

    addItems(items)
    {
        if(items && items.length) {
            items.forEach(item => {
                this.addItem(item);
            });
        }
    }

    addItem(item)
    {
        this.items.push(item);
        const $item = this.$createItem(this.getTypeOfItem(item));
        this.renderItem(item, $item);
        this.$container.append($item);
    }

    renderItem(item, $li)
    {

    }

    $createItem(type = 0)
    {
        if (!this._$itemTemplates[type]) {
            this._$itemTemplates[type] = this.$createNewItem(type);
        }
        return this._$itemTemplates[type].clone();
    }

    $createNewItem(type = 0)
    {
        return $(`<${this.getItemElementTag()}>`);
    }

    getItemElementTag()
    {
        return "li";
    }
}
