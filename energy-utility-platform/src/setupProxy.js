const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://energy-utility-platform-amc.herokuapp.com",
      changeOrigin: true,
    })
  );
};
