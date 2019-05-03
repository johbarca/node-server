const router = require('koa-router')()
const db = require('./db');

router.post('/login', async (ctx, next) => {
    await next();
    let name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';
    console.log(name, password);
    // console.log(ctx);
})
router.post('/register', async (ctx, next) => {
    await next();
    let name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';
        console.log(name, password);
    let addSqlParams =[name,password]
    console.log(addSqlParams)
    var sql = 'insert into user(name,password) values ?';
    db.query(sql, addSqlParams,function (err, result,fields) {
        if (result) {
            result = {
                code: 200,
                msg: '增加成功'
              };
        }
        console.log(result);
    });
})
module.exports = router