// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');

// 创建一个Koa对象表示web app本身:
const app = new Koa();
const router = require('./middleware/router');
const koaBody = require('koa-body'); //解析上传文件的插件
const cors = require('koa-cors'); //使用koa-cors解决跨域请求问题
const staticFiles = require('koa-static');
const session=require('koa-session');

app.use(cors({
    origin: function (ctx) {
        return "*";
        // return 'http://localhost:8080';
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'], //设置允许的HTTP请求类型
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));
app.keys = ['this is my secret key'];
app.use(session({
    key: 'koa:sess', /** cookie的名称，可以不管 */
    maxAge: 1800000, /** (number) maxAge in ms (default is 1 days)，cookie的过期时间，这里表示半个小时 */
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
  },app));

app.use(staticFiles(__dirname+"/public"))
app.use(koaBody());
app.use(router.routes());

// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...');