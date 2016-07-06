import NJUApplication from "../../nju/app/Application.js";

export default class Application extends NJUApplication
{
    init()
    {
        super.init();
        this.addStyleClass("nm-application");
    }

    run()
    {
        console.log("Net Music Webapp is now running...");
    }
}
