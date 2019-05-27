const router = require('koa-router')();
const koaBody = require('koa-body'); 
const db = require('./db');
const sqlMap = require('./sqlMap');
const fs = require('fs');
const path = require('path');


router.post('/login', async (ctx, next) => {
    // await next();
    let name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';
    let sql = sqlMap.user.select_name;
    let p = new Promise((resolve, reject) => {
        db.query(sql, [name], function (err, result) {
            if (password == result[0].password) {
                data = {
                    code: 200,
                    msg: '登录成功',
                    result: result
                };
                resolve(data);
            } else {
                err = {
                    msg: '登录失败'
                };
                resolve(err);
            }
        });
    });
    /* db.query(sql, [name], function (err, result) {
        if (password == result[0].password) {
            data = {
                code: 200,
                msg: '登录成功'
            };
            ctx.response.body = result;
        } else {
            console.log(err)
        }
    }); */
    let datas = await p;
    ctx.response.body = datas;
    // ctx.response.body = data;
});
router.post('/register', async (ctx, next) => {
    await next();
    let name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';
    let Params = [name, password];
    let sql = sqlMap.user.add;
    db.query(sql, Params, function (err, result, fields) {
        if (result) {
            result = {
                code: 200,
                msg: '注册成功'
            };
        } else {
            console.log(err)
        }
        // ctx.response.res = result
    });
    // ctx.response.type = 'text/html';
    ctx.response.body = {
        code: 200,
        msg: '注册成功'
    };
});
router.use(koaBody({
    multipart: true,
    formidable: {
        uploadDir: path.join(__dirname, '../src/img'), // 设置文件上传目录
        keepExtensions: true,
        maxFileSize: 2000 * 1024 * 1024 * 1024 // 设置上传文件大小最大限制，默认2M
    }
}))
router.post('/upload', async (ctx, next) => {
    const file = ctx.request.files.file; // 上传的文件在ctx.request.files.file
    console.log(file)
    // 创建可读流
    const reader = fs.createReadStream(file.path);
    // 修改文件的名称
    var myDate = new Date();
    var newFilename = myDate.getTime() + '.' + file.name.split('.')[1];
    /* var targetPath = path.join(__dirname, '../src/img') + `/${newFilename}`;
    //创建可写流
    const upStream = fs.createWriteStream(targetPath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream); */
    //返回保存的路径
    return ctx.response.body = {
        code: 200,
        data: {
            url: 'http://' + ctx.headers.host + '/uploads/' + newFilename
        }
    };
    
});

module.exports = router