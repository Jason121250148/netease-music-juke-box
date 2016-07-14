import ApplicationController from "./app/ApplicationController";

function main()
{
    const appController = new ApplicationController();
    appController.view.placeAt(document.body);
    appController.run();
}

$(main);
