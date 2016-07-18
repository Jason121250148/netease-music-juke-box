import ViewController from "../../nju/view/ViewController";

import PlayerView from "./PlayerView";

export default class PlayViewController extends ViewController
{
    createView(options)
    {
        return new PlayerView();
    }

    initView(options)
    {
        super.initView(options);
    }

    playMusic(item)
    {
        
    }
}
