const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://energy-platform-am-backend.herokuapp.com",
      changeOrigin: true,
    })
  );
};
