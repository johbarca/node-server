const router = require('koa-router')();
const db = require('./db');
const sqlMap = require('./sqlMap');
const upload = require('./upload');

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
router.post('/upload', async (ctx, next) => {
    if (ctx != "") {
        ctx.response.body = {
            code: 200,
            msg: '成功'
        };
    }
    /* form.parse(ctx.req, function(err, fields, files) {
        console.log(files);
        console.log(files.thumbnail.path);
        console.log('文件名:'+files.thumbnail.name);
        var t = (new Date()).getTime();
        //生成随机数
        var ran = parseInt(Math.random() * 8999 +10000);
        //拿到扩展名
        var extname = path.extname(files.thumbnail.name);

        //path.normalize('./path//upload/data/../file/./123.jpg'); 规范格式文件名
        var oldpath =   path.normalize(files.thumbnail.path);

        //新的路径
        let newfilename=t+ran+extname;
        var newpath =  './public/images/'+newfilename;
        console.warn('oldpath:'+oldpath+' newpath:'+newpath);
        fs.rename(oldpath,newpath,function(err){
            if(err){
                console.error("改名失败"+err);
            }
            res.render('index', { title: '文件上传成功:', imginfo: newfilename });
        });


        //res.end(util.inspect({fields: fields, files: files}));
    }); */
    upload.uploadPhoto(ctx.req,'img',function(err,fields,uploadPath){
        if(err){
            return res.json({
                errCode : 0,
                errMsg : '上传图片错误'
            });
        }
        console.log(fields);    //表单中字段信息
        console.log(uploadPath);    //上传图片的相对路径
        res.json({
            errCode : 1,
            errMsg : '上传成功',
            fields :  fields,
            uploadPath : uploadPath
        });
        return ctx.body = {
            url: remotefilePath,
            message: "文件上传成功",
            cc: 0
        } 
    });
    
});

module.exports = router