import View from "./View";

export default class ListView extends View
{
    init()
    {
        super.init();
        this._items = [];
        this._selection = null;
        this._$itemTemplates = [];
        this._countItems = 0;
        this.addStyleClass("nju-list-view");

        this._initLayout();

        this.$container.on("mousedown", this.getItemElementTag(), this._onclick.bind(this));

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
        this.selection = null;
        if (value && value.length > 0)
        {
            const valueLength = value.length;
            if (valueLength > this.countItems)
            {
                this.addItems(value.slice(0, this.countItems), true);
                this.addItems(value.slice(this.countItems, valueLength), false);
            }
            else
            {
                this.addItems(value.slice(0, valueLength), true);
                this.clearItems(valueLength, this.countItems);
            }
            this.countItems = valueLength;
        }
    }

    get selection()
    {
        return this._selection;
    }
    set selection(value)
    {
        this.selectItem(value);
    }

    get selectedId()
    {
        return this.getIdOfItem(this.selection);
    }

    get countItems()
    {
        return this._countItems;
    }
    set countItems(value)
    {
        this._countItems = value;
    }

    getTypeOfItem(item)
    {
        return 0;
    }

    clearItems(start, end)
    {
        for (let i = start; i < end; i++) {
            this.items.splice(start, end - start + 1);
            this.$container.children(`:nth-child(${start + 1})`).remove();
        }
    }

    addItems(items, ifNew = false)
    {
        if (items && items.length > 0)
        {
            if (ifNew)
            {
                items.forEach((item, i) => {
                    this.addItem(item, i);
                });
            }
            else
            {
                items.forEach(item => {
                    this.addItem(item, null);
                });
            }
        }
    }

    addItem(item, modify)
    {
        if (modify !== null)
        {
            this.items[modify] = item;
            const $item = this.$container.children(this.getItemElementTag).eq(modify);
            this.renderItem(item, $item);
        }
        else
        {
            this.items.push(item);
            const $item = this.$createItem(this.getTypeOfItem(item));
            this.renderItem(item, $item);
            this.$container.append($item);
        }
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

        this.trigger("selectionchanged", item);
    }

    getIdOfItem(item)
    {
        if (item)
        {
            return item.id;
        }
        else {
            return null;
        }
    }


    showSelection()
    {
        this.removeStyleClass("hide-selection");
    }

    hideSelection()
    {
        this.addStyleClass("hide-selection");
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
        return this._$itemTemplates[type].clone();//可以大大提高效率
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
        this.trigger("itemclicked", { item });
        this.selectItem(item);
    }
}
