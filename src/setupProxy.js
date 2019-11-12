const proxy = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    proxy('/api', {
      target: 'https://svc.adsota.com',
      changeOrigin: true,
      secure: false,
    }),
  );
};
