import ListView from "../../nju/view/ListView";
import View from "../../nju/view/View.js";

export default class SearchView extends View
{
    init()
    {
        super.init();
        this.addStyleClass("nm-search-view");

        this._initLayout();
        this.$element.on("keydown", this._onkeydown.bind(this));
        this.$element.on("click", "span.icon", this._icon_click.bind(this));
        let inputTime = null;
        this.$input.on("input", () => {
            if (inputTime)
            {
                window.clearTimeout(inputTime);
                inputTime = null;
            }
            inputTime = window.setTimeout(() => {
                this.trigger("inputchange");
            },200);
        });

        this._initSuggestionView();
        this.$input.on("focus", this._focus.bind(this));
        this.$input.on("blur", this._blur.bind(this));
    }

    _initSuggestionView()
    {
        this.suggestionView = new ListView("suggestion");
        this.suggestionView.renderItem = this._suggestion_renderItem.bind(this.suggestionView);
        this.addSubview(this.suggestionView, this.$container);
        this.hideSuggestion();
    }

    get text()
    {
        return this.$input.val().trim();
    }
    set text(value)
    {
        this.$input.val(typeof(value) === "string" ? value.trim() : "");
    }

    _initLayout()
    {
        this.$element.append(`<span class='icon iconfont icon-search'>`);
        this.$input = $("<input type=search placeholder='搜索音乐'/>");
        this.$element.append(this.$input);
    }

    hideSuggestion()
    {
        this.suggestionView.$element.hide();
    }

    showSuggestion()
    {
        this.suggestionView.$element.show();
    }

    toggleSuggestion(shown)
    {
        if (shown)
        {
            this.showSuggestion();
        }
        else {
            this.hideSuggestion();
        }
    }


    search(text = this.text)
    {
        this.text = text;
        if (this.text !== "")
        {
            this.trigger("search");
        }
    }


    _onkeydown(e)
    {
        if (e.keyCode === 13)
        {
            this.search();
        }
    }

    _icon_click(e)
    {
        this.search();
    }

    _suggestion_renderItem(item, $item)
    {
        $item.text(item.name);
        $item.data("item", item);
    }

    _focus(e)
    {
        this.trigger("focus");
    }

    _blur(e)
    {
        this.trigger("blur");
    }

}
