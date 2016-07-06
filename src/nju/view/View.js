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



    addSubview(view, $container = this.$container)
    {
        if (view instanceof View)
        {
            if (view.parent)
            {
                view.removeFromParent();
            }
            view._parent = this;
            this._subviews.push(view);
            view.placeAt($container);
        }
    }

    addSubviews(views, $container = this.$container)
    {
        if (Array.isArray(views))
        {
            views.forEach(view => {
                this.addSubview(view, $container);
            });
        }
    }

    removeSubview(view, neverUseAgain = false)
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
            this.removeSubview(this._subviews[0], neverUseAgain);
        }
    }

    removeFromParent()
    {
        if (this.parent)
        {
            this.parent.removeSubview(this);
        }
    }

    placeAt(target)
    {
        const $target = (target instanceof jQuery ? target : $(target));
        $target.append(this.$element);
    }

    $(...args)
    {
        return this.$element.find(...args);
    }
}
