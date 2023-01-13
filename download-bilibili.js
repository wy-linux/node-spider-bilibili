const { downloadAll } = require('./bin/index')
const cheerio = require('cheerio')
const axios = require('axios')
const {headers} = require('./config')
async function resolveBilibili(url, name, dir) {
   let res = await axios({
        url,
        headers,
        method: 'get',
   })
   console.log(res.data);
    $ = cheerio.load(res.data);
    const title = $('title').text().replace(/[\s\\\/]/g, '')
    //可以使用预查直接一步到位获取目标字符串
    // let json = /(?<=<script>).*?(?=<\/script>)/.exec(res.data)
    let json = /<script>(.*?)<\/script>/.exec(res.data)
    json = json[1].match(/window.__playinfo__=(.*)/)[1]
    json = JSON.parse(json)
    return downloadAll(
        json.data.dash.audio[0].backup_url[1], 
        json.data.dash.video[0].backup_url[1], 
        name ? name : title, 
        dir
    )
}
resolveBilibili(
    'https://www.bilibili.com/video/BV1z8411p7JU/?spm_id_from=333.1007.tianma.2-1-3.click',
    null,
    './video'    
).then(
    () => {
        console.log('爬取成功');
    },
    (error) => {
        console.log(error);
    }
)