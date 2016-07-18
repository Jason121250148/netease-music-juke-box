import View from "../../nju/view/View";

export default class PlayerView extends View
{
    init()
    {
        super.init();
        this.addStyleClass("nm-player-view");

        this._music = null;
        this._initLayout();
    }

    _initLayout()
    {
        this.$element.append(`
            <audio class = "audio" src="" controls autoplay loop>
            </audio>
            <span class = "name"></span>
        `);
    }

    set music(value)
    {
        if (value !== null)
        {
            this._music = value;
            this.$element.find("span.name").text(this.music.name);
            this.play(this.music.mp3Url);
        }
        else {
            this.$element.find("span.name").text("");
        }

    }
    get music()
    {
        return this._music;
    }

    play(src)
    {
        if (src && src !== "")
        {
            this.$element.find("audio.audio").attr("src", src);
        }
    }
}
