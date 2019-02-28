'use strict'

const PixivAppApi = require('pixiv-app-api');
const pixivImg = require('pixiv-img');
const axios = require('axios');

const { httpsOverHttp, httpOverHttp } = require('tunnel-agent');
const TUNNEL_OPTIONS = {
	proxy: {
		host:'127.0.0.1',
		port: 1080
	}
};

axios.interceptors.request.use(function (config) {
  config.proxy = false; // 强制禁用环境变量中的代理配置
  config.httpAgent = httpOverHttp(TUNNEL_OPTIONS);
  config.httpsAgent = httpsOverHttp(TUNNEL_OPTIONS);
  return config;
})

const pixiv = new PixivAppApi('nixizhiguang@gmail.com','shijiehuimie2015');

/*pixiv
  .searchIllust('艦これ10000users入り')
  .then(json => {
    console.log(`downloading ${json.illusts[0].title}`)
    //return pixivImg(json.illusts[0].imageUrls.large)
  })
  .then(() => {
    console.log('finish')
  }).catch((e) => {
  	console.log(e);
  });*/

pixiv.login('nixizhiguang@gmail.com','shijiehuimie2016')
.then(
(json) => {
  	console.log(json);
  	return;
}/*,
err => console.log(err)*/
)
.then(() => {
	console.log('finish login action');
});