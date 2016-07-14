import View from "../../nju/view/View";

export default class PlayerView extends View
{
    init()
    {
        super.init();
        this.addStyleClass("nm-player-view");

        this._name = null;
        this._initLayout();
    }

    _initLayout()
    {
        this.$element.append(`
            <span class = "name"></span>
        `);
    }

    set name(value)
    {
        if (value !== null)
        {
            this._name = value.name;
            this.$element.find("span.name").text(this._name);
        }
        else {
            this.$element.find("span.name").text("");
        }
    }
    get name()
    {
        return this._name;
    }


}
