import md5 from './md5'
import { Base64 } from 'js-base64';

function sign(){

    const access_key = 'SiNp6IBcr6qWSi4IYkX6awrwRBZmyPtb'; // 服务端生成的 access_key
      const secret_key = 'KJanjo6EAIP3e8qTalTwq3EfwM5s9igW'; // 服务端生成的 secret_key

      const timestamp = Date.parse(new Date()) / 1000; // 取时间戳
      const echostr = 'asldjaksdjlkjgqpojg64131321'; // 随机字符串自行生成

      const header = Base64.encode(JSON.stringify({
        "alg": "md5",
        "type": "jwt"
      }));
      const payload = Base64.encode(JSON.stringify({
        "timestamp": timestamp,
        "echostr": echostr,
        "ak": access_key
      }));
      const signature_string = header + '.' + payload;

      function md5Sign(string, secret) {
        return md5(string + secret); // md5 库自行引入
      }

      const api_token = signature_string + '.' + md5Sign(signature_string, secret_key);//签名token
       
  return api_token;

    
}
 
export default sign


