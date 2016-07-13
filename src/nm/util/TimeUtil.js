export default class TimeUtil
{
    static formatPlayTime(time)
    {
        const ms = Math.round(time / 1000);
        const seconds = ms % 60;
        const minutes = ( ms - seconds ) / 60;
        return _digit2(minutes) + " : " + _digit2(seconds);
    }
}

function _digit2(seconds)
{
    if (seconds > 9)
    {
        return seconds;
    }
    else
    {
        return "0" + seconds;
    }
}
