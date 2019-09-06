const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/api', { target: `http://localhost:${process.env.REACT_APP_PORT}/` }));
};