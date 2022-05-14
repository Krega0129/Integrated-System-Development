const Koa = require('koa');
// 解析 json
const bodyParser = require('koa-bodyparser');
// 路由入口
const useRoutes = require('../routes');
// 错误处理
const errorHandler = require('./error-handler');

const app = new Koa()

app.use(bodyParser());

useRoutes(app);

// 处理错误信息
app.on('error', errorHandler)

module.exports = app;

