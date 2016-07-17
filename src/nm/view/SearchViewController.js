import SearchView from "./SearchView";
import ServiceClient from "../service/ServiceClient";
import ViewController from "../../nju/view/ViewController";

export default class SearchViewController extends ViewController
{
    createView(options)
    {
        return new SearchView("search");
    }

    initView(options)
    {
        super.initView(options);
        this.view.on("inputchange", this._onInputChange.bind(this));

        this.suggestionView = this.view.suggestionView;
        this.suggestionView.on("itemclicked", this._onSuggestionClicked.bind(this));

        this.view.on("focus", this._onFocus.bind(this));
        this.view.on("blur", this._onBlur.bind(this));
    }

    async _onInputChange()
    {
        const keyword = this.view.text;

        if (keyword)
        {
            const results = await ServiceClient.getInstance().search(keyword, true);
            this.suggestionView.items = results.songs;
            this.view.toggleSuggestion(results.songs && results.songs.length > 0);
        }
    }

    _onFocus(e)
    {
        this.view.toggleSuggestion(this.view.text && this.suggestionView.items && this.suggestionView.items.length > 0);
    }

    _onBlur(e)
    {
        this.view.hideSuggestion();
    }

    _onSuggestionClicked(e)
    {
        const keyword = e.parameters.item.name;
        this.view.search(keyword);
        this.view.hideSuggestion();
    }
}
