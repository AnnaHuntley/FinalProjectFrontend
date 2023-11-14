const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',  // Specify the base URL of your Rails API
    createProxyMiddleware({
      target: 'http://localhost:4000',  // Specify the address of your Rails server
      changeOrigin: true,
    })
  );
};
