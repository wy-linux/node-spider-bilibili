const { downloadMp3, downloadVideo, downloadAll } = require('./bin/index')
const cheerio = require('cheerio')
const axios = require('axios')
const headers = {
        referer: 'https://www.bilibili.com/video/BV1HV4y177gH/?vd_source=108710f9dc8bf2ee2e2257f9f77a89f7',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
    }

async function resolveBilibili(url) {
   let res = await axios({
        url,
        headers,
        method: 'get',
   })
   console.log(res.data);
    $ = cheerio.load(res.data);
    const title = $('title').text().replace(/[\s\\\/]/g, '')
    // let json = /(?<=<script>) & (?=<\/script>)/.exec(res.data)
    let json = /<script>(.*?)<\/script>/.exec(res.data)
    json = json[1].match(/window.__playinfo__=(.*)/)[1]
    json = JSON.parse(json)
    downloadAll(json.data.dash.audio[0].backup_url[1], json.data.dash.video[0].backup_url[1], title)
}
resolveBilibili(
    'https://www.bilibili.com/video/BV1HV4y177gH/?spm_id_from=333.788.recommend_more_video.0&vd_source=108710f9dc8bf2ee2e2257f9f77a89f7'
)