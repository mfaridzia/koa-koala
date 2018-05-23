'use strict'
const Koa = require('koa');
const path = require('path');
const render = require('koa-ejs');
const KoaRouter = require("koa-router");

const app = new Koa();
const router = KoaRouter();
const port = process.env.PORT || 6061

// error handling
app.use(async (ctx, next) => {
  try {
    await next();
  } catch(err) {
    console.log(err.status);
    ctx.status = err.status || 500;
    ctx.body = err.message;
  }
})

// settings template engine
render(app, {
  root: path.join(__dirname, 'view'),
  layout: false,
  viewExt: 'html',
  cache: false,
  debug: false // true
});

// routing with named routes and template
router.get("koala", "/", ctx => {
  let koala_attributes = [];
  koala_attributes.push({
    meta_name: "Color",
    meta_value: "Black and white"
  });
  koala_attributes.push({
    meta_name: "Native Country",
    meta_value: "Indonesia"
  });
  koala_attributes.push({
    meta_name: "Animal Classification",
    meta_value: "Mammal"
  });
  koala_attributes.push({
    meta_name: "Life Span",
    meta_value: "13 - 18 Years"
  });
  koala_attributes.push({
    meta_name: "Programming Language",
    meta_value: "JavaScript"
  });
  return ctx.render("index", { attributes: koala_attributes });
});

// test error handling
router.get('/error', ctx => {
  ctx.throw(500, 'Test Error Message');
});

// response
router.get('/resp', ctx => {
  ctx.status = 200;
  ctx.body   = 'Response body!';
});

// routing
router.get('/hallo', ctx => {
  ctx.body = 'Hallo bro!!';
});

app.use(router.routes())
  .use(router.allowedMethods())

app.listen(port, () => {
  console.log(`Server running on port localhost:${port}`);
});
