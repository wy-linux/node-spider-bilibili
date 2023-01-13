const { downloadAll } = require('./bin/index')
const cheerio = require('cheerio')
const axios = require('axios')
const {headers} = require('./config')
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
    'https://www.bilibili.com/video/BV1z8411p7JU/?spm_id_from=333.1007.tianma.2-1-3.click'
)