### 爬取[哔哩哔哩视频](https://www.bilibili.com/)的node.js项目
```shell
1. npm install  下载相关依赖
2. node download-bilibili.js  进行爬取视频，需传入PC端网页版哔哩哔哩对应的视频链接
3. 哔哩哔哩视频：https://www.bilibili.com/
```
```javascript
/**
 * 
 * @param {*} url必传：要爬取视频的链接，从网页版bilibili的浏览器地址栏里复制
 * @param {*} name可以不传：要爬取视频的名称，默认自动解析为视频原本的名称 
 * @param {*} dir可以不传：爬取视频的存放目录，默认为当期目录的video文件夹
 * @returns 
 */
async function resolveBilibili(url, name, dir)
```
### 项目结构
1. bin 目录下为核心库，封装了整个爬虫的核心请求逻辑
2. download-bilibili.js 项目入口文件，启动整个爬虫程序
3. index.html 解析B站网页源代码后 格式化生成，用于理解网站源码，方便后续编写爬虫程序
4. index.json 网页源代码中的核心部分，内有音频/视频的爬取链接
##### 运行中产生的文件夹
1. _video 爬取过程中的临时文件夹，里面存放了爬取过程中的音频/视频
2. video 存放了使用ffmpeg对临时文件夹_video中的音频/视频合成后生成的目标视频文件

### 相关依赖
使用本爬虫需要流媒体处理工具ffmpeg，否则无法将音频/视频进行合成
> 新版node-wangyu-BiliDown，使用B站解析url直接爬取MP4源文件，无需ffmpeg合成音视频。见：
https://github.com/wy-linux/node-wangyu-bilidown