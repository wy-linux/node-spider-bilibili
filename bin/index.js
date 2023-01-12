const axios = require('axios')
const fs = require('fs')
const child_process = require('child_process')
async function downloadMp3(url, name) {
    let res = await axios(
        {
            url, 
            headers: {
                        referer: 'https://www.bilibili.com/video/BV1HV4y177gH/?vd_source=108710f9dc8bf2ee2e2257f9f77a89f7',
                        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
                    },
            method: 'get',
            responseType: "stream",
            onDownloadProgress: (progressEvent) => {
            const progress = progressEvent.loaded / progressEvent.total * 100 
                console.log(`
                ------------------------
                音频下载进度${progress}%
                `);    
            }
        }
    )
    return new Promise((resolve, reject) => {
        const writer = fs.createWriteStream(`./_video/${name}.mp3`);
        res.data.pipe(writer);
        writer.on("finish", () => {
            console.log('音频数据流写入完成');
            resolve('音频数据流写入完成')
        });
        writer.on("error", (err) => {
            console.log(err);
            reject(err)
        })
    })
}
async function downloadVideo(url, name) {
    let res = await axios(
        {
            url,
            method: 'get',
            headers: {
                        referer: 'https://www.bilibili.com/video/BV1HV4y177gH/?vd_source=108710f9dc8bf2ee2e2257f9f77a89f7',
                        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
                    },
            responseType: "stream",
            onDownloadProgress: (progressEvent) => {
                const progress = progressEvent.loaded / progressEvent.total * 100 
                console.log(`
                ------------------------
                视频下载进度${progress}%
                `);    
           }
        }
    )
    return new Promise((resolve, reject) => {
        const writer = fs.createWriteStream(`./_video/${name}.mp4`);
        res.data.pipe(writer);
        writer.on("finish", () => {
            console.log('视频数据流写入完成');
            resolve('视频数据流写入完成')
        });
        writer.on("error", (err) => {
            console.log(err);
            reject(err)
        })
    })
}
async function downloadAll(mp3Url, mp4Url, name) {
    if (!fs.existsSync('./_video')) {
        fs.mkdirSync('./_video')
    }
    if (!fs.existsSync('./video')) {
        fs.mkdirSync('./video')
    }
    await Promise.all([downloadMp3(mp3Url, name),downloadVideo(mp4Url, name)])
    //ffmpeg -i ./_video/${name}.mp4 -i ./_video/${name}.mp3 -c copy ./video/${name}.mp4
    child_process.exec(`ffmpeg -i ./_video/${name}.mp4 -i ./_video/${name}.mp3 ./video/${name}.mp4`,function(error, stdout, stderr){
        if(error){
            console.error("合成失败---",error);
        }else{
            console.log("合成成功--",stdout);
        }
        // 删除临时文件
        child_process.exec('rm -rf ./_video', () => {
          console.log('清理_video文件夹成功');
        })
    });
}
// downloadALL(
//     'https://upos-sz-mirrorcosb.bilivideo.com/upgcxcode/66/81/779808166/779808166_nb3-1-30232.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1673521419&gen=playurlv2&os=cosbbv&oi=0&trid=f713be2143774bc0997359a7cc6b70dau&mid=194162133&platform=pc&upsig=b300d2c9d6e9e27a142051506d6249f3&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform&bvc=vod&nettype=0&orderid=2,3&buvid=59A23B71-E8AE-42A5-BEB2-30ABB617AA28143082infoc&build=0&agrr=1&bw=16663&logo=40000000',
//     'https://upos-sz-mirrorali02.bilivideo.com/upgcxcode/66/81/779808166/779808166-1-100024.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1673521419&gen=playurlv2&os=ali02bv&oi=0&trid=f713be2143774bc0997359a7cc6b70dau&mid=194162133&platform=pc&upsig=cf6eb663e0e9511aee59e4deb29d84f7&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform&bvc=vod&nettype=0&orderid=0,3&buvid=59A23B71-E8AE-42A5-BEB2-30ABB617AA28143082infoc&build=0&agrr=1&bw=41861&logo=80000000',
//     '戚十一'
// )

module.exports = { downloadMp3, downloadVideo, downloadAll }