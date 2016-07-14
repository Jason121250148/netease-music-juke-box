import ViewController from "../view/ViewController.js";
import Application from "./Application.js";

export default class ApplicationController extends ViewController
{
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
        return new Application();
    }

    run()
    {

    }
}
