import ViewController from "../view/ViewController.js";
import Application from "./Application.js";

export default class ApplicationController extends ViewController
{
    static _instance = null;

    constructor(...args)
    {
        super(...args);
        if (ApplicationController._instance === null)
        {
            ApplicationController._instance = this;
        }
        else {
            throw new Error("Only one ApplicationController allowed.");
        }
    }

    static getInstance()
    {
        if (ApplicationController._instance === null)
        {
            throw new Error("ApplicationController has not been instantiated yet");
        }
        return ApplicationController._instance;
    }

    get application()
    {
        return this.view;
    }

    createView(options = {})
    {
        return this.createApplication(options);
    }

    createApplication(options = {})
    {
        return new Error("createApplication must be override in the derived class");
    }

    run()
    {

    }
}
