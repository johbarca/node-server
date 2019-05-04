const router = require('koa-router')()
const db = require('./db');
const sqlMap = require('./sqlMap');

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
                    result:result
                };
                resolve(data);
            } else {
                err = {
                    msg: '登录失败'
                };
                reject(err);
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
})
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
})
module.exports = router