const router = require('koa-router')();

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
});

router.get('/search/:kw', async (ctx, next) => {

  let kw = ctx.params.kw ;



  ctx.body = kw;
});
module.exports = router;
