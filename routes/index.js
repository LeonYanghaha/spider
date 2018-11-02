const router = require('koa-router')();
const esUtil  = require("../middlewares/esUtil");

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
});

router.get('/search/:kw', async (ctx, next) => {

  let kw = ctx.params.kw ;
  let res =await esUtil.search(kw) ;
  ctx.body = res;

});
module.exports = router;
