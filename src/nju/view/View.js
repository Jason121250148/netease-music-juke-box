import ManageObject from "../base/ManageObject";

export default class View extends ManageObject
{
    init()
    {
        super.init();
        this._subviews = [];
        this.$element = $(`<${this.getElementTag()}/>`);
        if (this.id != null)
        {
            this.$element.attr("id", this.id);
        }
        this.$container = this.$element;
    }

    getElementTag()
    {
        return "div";
    }

    

    get subviews()
    {
        return this._subviews;
    }

    addStyleClass(...args)
    {
        this.$element.addClass(...args);
    }

    removeStyleClass(...args)
    {
        this.$element.removeClass(...args);
    }

    toggleStyleClass(...args)
    {
        this.$element.toggleClass(...args);
    }



    addSubView(view)
    {
        if (view instanceof View)
        {
            if (view.parent)
            {
                view.removeFromParent();
            }
            view._parent = this;
            this._subviews.push(view);
            this.$container.append(view.$element);
        }
    }

    addSubViews(views)
    {
        if (Array.isArray(views))
        {
            views.forEach(view => {
                this.addSubView(view);
            });
        }
    }

    removeSubView(view, neverUseAgain = false)
    {
        if (view instanceof View)
        {
            this.removeFromParent();
            const index = this._subviews.indexOf(view);
            if (index !== -1)
            {
                this._parent = null;
                this._subviews.splice(index, 1);
            }
            if (neverUseAgain)
            {
                view.$element.remove();
            }
            else {
                view.$element.detach();
            }
        }
    }

    removeAllSubviews(neverUseAgain = false)
    {
        while (this._subviews.length > 0)
        {
            this.removeSubView(this._subviews[0], neverUseAgain);
        }
    }

    removeFromParent()
    {
        if (this.parent)
        {
            this.parent.removeSubView(this);
        }
    }


    $(...args)
    {
        return this.$element.find(...args);
    }
}
