// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');

// 创建一个Koa对象表示web app本身:
const app = new Koa();

const router = require('./middleware/router');
const bodyParser = require('koa-bodyparser');
//使用koa-cors解决跨域请求问题
const cors = require('koa-cors');
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
//使用koa-bodyparser处理body读取问题
app.use(bodyParser());
app.use(router.routes());
// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...');