import View from "../../nju/view/View.js"

export default class Panel extends View
{
    constructor(...args)
    {
        super(...args);
        this._title = "";
        this.addStyleClass("nm-panel");
        this._initLayout();
    }

    set title(title)
    {
        this._title = title;
        this.$header.children("h2").text(title);
    }

    get title()
    {
        return this._title;
    }


    _initLayout()
    {
        this.$header = $(`<header><h2><h2/><header/>`);
        this.$container = $(`<main/>`);
        this.$element.append(this.$header);
        this.$element.append(this.$container);
    }
}
