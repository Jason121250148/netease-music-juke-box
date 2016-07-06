import Application from "../nm/app/Application.js";

function main()
{

    const app = new Application();
    app.placeAt(document.body);
    app.run();
}

$(main);
