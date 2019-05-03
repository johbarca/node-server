const router = require('koa-router')()


router.post('/login', async (ctx, next) => {
    await next();
    let name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';
    console.log(name, password);
    // console.log(ctx);
})
module.exports = router