interface WordDaily {
  /**
   c :a	动画
      b	漫画
      c	游戏
      d	文学
      e	原创
      f	来自网络
      g	其他
      h	影视
      i	诗词
      j	网易云
      k	哲学
      l	抖机灵
      其他	作为 动画 类型处理
   */
  c?: Array<string>;
  encode?: 'text' | 'json';
  charset?: 'utf-8' | 'gbk';
}
const wordDaily = <T = any>(params?: WordDaily) => {
  return new Promise<T>((resolve, reject) => {
    let url = 'https://v1.hitokoto.cn';
    if (params) {
      let paramsArray = [];
      //拼接参数
      Object.keys(params).forEach(key => {
        if (key === 'c') {
          params['c'].forEach(c => {
            paramsArray.push(key + '=' + c);
          });
        } else {
          paramsArray.push(key + '=' + params[key]);
        }
      });
      if (url.search(/\?/) === -1) {
        url += '?' + paramsArray.join('&');
      } else {
        url += '&' + paramsArray.join('&');
      }
    }
    fetch(url, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(json => {
        resolve(json);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export {wordDaily};
