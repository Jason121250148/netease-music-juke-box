import View from "./View";

export default class ListView extends View
{
    init()
    {
        super.init();
        this._items = null;
        this._selection = null;
        this._$itemTemplates = [];
        this.addStyleClass("nju-list-view");

        this._initLayout();

        this.$container.on("click", this.getItemElementTag(), this._onclick.bind(this));
    }

    _initLayout()
    {

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

    get selection()
    {
        return this._selection;
    }
    set selection(value)
    {
        this.selectItem(value);
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






    selectItem(item = null)
    {
        if (this.selection === item) return;

        if (this.selection !== null)
        {
            this.$getItem(this._selection).removeClass("selected");
            this._selection = null;
        }

        this._selection = item;

        if (item)
        {
            const $item = this.$getItem(item);
            $item.addClass("selected");
        }
    }

    getIdOfItem(item)
    {
        return item.id;
    }








    renderItem(item, $item)
    {
        $item.data("item", item);
        $item.attr("id", "i-" + this.getIdOfItem(item));
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

    $getItem(item)
    {
        const id = this.getIdOfItem(item);
        return this.$container.children("#i-" + id);
    }

    getItemElementTag()
    {
        return "li";
    }

    _onclick(e)
    {
        const $item = $(e.currentTarget);
        const item = $item.data("item");
        console.log(this.getIdOfItem(item));
        this.selectItem(item);
    }
}
