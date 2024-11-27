const predictionHandler = require('../handlers/predictionHandler');

const predictionRoutes = [
  {
    method: 'POST',
    path: '/predict',
    handler: predictionHandler.predict,
    options: {
      payload: {
        output: 'stream',
        parse: true,
        multipart: true,
        maxBytes: 1000000 // 1 MB
      }
    }
  }
];

module.exports = predictionRoutes;