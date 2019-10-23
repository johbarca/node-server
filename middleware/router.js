/*
 * @Author: liulicheng
 * @Github: https://github.com/johbarca
 * @Date: 2019-05-29 11:08:05
 * @LastEditors: liulicheng
 * @LastEditTime: 2019-08-16 17:39:45
 */
const router = require('koa-router')();
const koaBody = require('koa-body');
const db = require('./db');
const sqlMap = require('./sqlMap');
const fs = require('fs');
const path = require('path');
var dateFormat = require('dateformat');

router.post('/login', async (ctx, next) => {
    // await next();
    let name = ctx.request.body.name,
        password = ctx.request.body.password;
    let sql = sqlMap.user.select_name;
    let result = await new Promise((resolve, reject) => {
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
    ctx.session.user = name;
    ctx.response.body = result;
});
router.post('/register', async (ctx, next) => {
    // await next();
    let name = ctx.request.body.name,
        password = ctx.request.body.password;
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
router.post('/getFiles', async (ctx, next) => {
    if (!ctx.session.user) {
        ctx.response.redirect('/login');
    }
    let userName = ctx.request.body.userName;
    let sql = sqlMap.file.getFile;
    let Params = [userName];
    let result = await new Promise((resolve, reject) => {
        db.query(sql, Params, function (err, result, fields) {
            if (result) {
                data = {
                    code: 200,
                    msg: '获取文件成功',
                    fileLists: result
                };
                resolve(data);
            } else {
                err = {
                    msg: '获取文件失败'
                };
                resolve(err);
            }
        });
    })
    ctx.body = result;
});
router.post('/download', async (ctx, next) => {
    const filename = ctx.request.body.filename;
    let file = path.join(__dirname, '../public/img/') + filename;
    console.log(filename);
    let readStream = fs.createReadStream(file); //得到文件输入流
    readStream.on('data', (chunk) => {
        ctx.response.body.write(chunk, 'binary'); //文档内容以二进制的格式写到response的输出流
    });
    readStream.on('end', () => {
        ctx.response.body.end();
    })
});
router.post('/getinfo', async (ctx, next) => {
    let sql = sqlMap.live_info.getLiveInfo;
    let result = await new Promise((resolve, reject) => {
        db.query(sql, function (err, result, fields) {
            if (result) {
                data = {
                    code: 200,
                    msg: '获取直播间成功',
                    liveLists: result
                };
                resolve(data);
            } else {
                err = {
                    msg: '获取直播间失败'
                };
                resolve(err);
            }
        });
    });
    ctx.body = result;
});

router.use(koaBody({
    multipart: true,
    formidable: {
        uploadDir: path.join(__dirname, '../public/img'), // 设置文件上传目录
        keepExtensions: true,
        maxFileSize: 2000 * 1024 * 1024 * 1024 // 设置上传文件大小最大限制，默认2M，这里设为2G
    }
}));
router.post('/upload', async (ctx, next) => {
    const file = ctx.request.files.file; // 上传的文件在ctx.request.files.file
    // 修改文件的名称
    let userName = ctx.request.body.userName;
    let time = dateFormat(new Date(), "yyyymmddHHMMss");
    let extName = path.extname(file.path);
    let newName = time + '_' + Math.floor(Math.random() * 9999) + extName;
    let oldPath = file.path;
    let newPath = path.join(__dirname, '../public/img', newName);
    fs.renameSync(oldPath, newPath);
    let filePath = 'http://localhost:3000/img/' + newName;
    // let url = 'http://localhost:3000/download/' + newName;
    let sql = sqlMap.file.add;
    let Params = [userName, newName, filePath]
    let result = await new Promise((resolve, reject) => {
        db.query(sql, Params, function (err, result, fields) {
            if (result) {
                data = {
                    code: 200,
                    msg: '上传成功'
                };
                resolve(data);
            } else {
                err = {
                    msg: '上传文件失败'
                };
                resolve(err);
            }
        });
    });
    ctx.response.body = result;
    /* var finalPath = path.join('/',dirName,newName).split('\\').join('/'); 
    // 创建可读流
    //const reader = fs.createReadStream(file.path);
    // 创建可写流
    const upStream = fs.createWriteStream(newPath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream); */
    return ctx.response.body = {
        code: 200,
        data: {
            url: 'http://' + ctx.headers.host + '/uploads/' + newName
        }
    };
});


module.exports = router