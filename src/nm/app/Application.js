import NJUApplication from "../../nju/app/Application.js";

export default class Application extends NJUApplication
{
    init()
    {
        super.init();
        this.addStyleClass("nm-app");
        this._initLayout();
    }

    _initLayout()
    {
        this.$element.append(`
            <header></header>
            <main></main>
            <footer></footer>
        `);
    }

    run()
    {
        console.log("Net Music Webapp is now running...");
    }
}
