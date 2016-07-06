export default class ManageObject
{
    constructor( id = null )
    {
        this._id = id;
        this._parent = null;
        this.init();
    }

    init()
    {

    }

    get parent()
    {
        return this._parent;
    }

    get id()
    {
        return this._id;
    }
}
