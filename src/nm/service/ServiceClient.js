const NM_API_URL = "http://music.163.com/api";

export default class ServiceClient
{
    getUserPlayLists(uid = "7042728")
    {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `${NM_API_URL}/user/playlist/`,
                data: {
                    uid: uid,
                    limit: 1000,
                    offset: 0
                }
            }).then(res => {
                if (res.code === 200){
                    resolve(res.playlist);
                }
                else {
                    reject("Respond with code:" + res.code);
                }
            }, reject);
        });
    }

    getPlayListDetail(listId = "99459881"){
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `${NM_API_URL}/playlist/detail/`,
                data: {
                    id: listId
                }
            }).then(res => {
                if (res.code === 200){
                    console.log(res.result);
                    resolve(res.result);
                }
                else {
                    reject("Respond with code:" + res.code);
                }
            }, reject);
        });
    }
}

let __instance = null;
ServiceClient.getInstance = function()
{
    if (__instance === null)
    {
        __instance = new ServiceClient();
    }
    return __instance;
};
