import ManagedObject from "../base/ManagedObject";
import View from "./View.js";

export default class ViewController extends ManagedObject
{
    constructor(id, options = {})
    {
        super(id);
        this._view = this.createView(options);
        this.initView(options);
    }

    createView(options)
    {
        return new View();
    }

    initView(options)
    {
        this.applyViewOptions(options);
    }

    applyViewOptions(options = {})
    {
        for ( let key in options )
        {
            this.view[key] = options[key];
        }
    }

    get view()
    {
        return this._view;
    }

    // set view(value)
    // {
    //     this._view = value;
    // }
}
