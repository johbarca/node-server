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
router.post('/upload',async(ctx,next)=>{
    /**设置响应头允许ajax跨域访问**/
    // res.setHeader("Access-Control-Allow-Origin","*");
    console.log(ctx.request.body)
    if(ctx!=""){
        ctx.response.body = {
            code: 200,
            msg: '成功'
        };
    }
    /* upload.uploadPhoto(req,'img',function(err,fields,uploadPath){
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
    }); */
});
/* router.post('/upload',function(req,res){
    //设置响应头允许ajax跨域访问
    // res.setHeader("Access-Control-Allow-Origin","*");
    console.log(req)
    if(req!=""){
        ctx.response.body = {
            code: 200,
            msg: '成功'
        };
    }
    upload.uploadPhoto(req,'img',function(err,fields,uploadPath){
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
    });
}); */



module.exports = router