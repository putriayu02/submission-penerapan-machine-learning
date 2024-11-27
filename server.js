const Hapi = require('@hapi/hapi');
const predictionRoutes = require('./routes/predictionRoutes');
const config = require('./config/tensorflowConfig');

const server = Hapi.server({
  port: process.env.PORT || 3000,
  host: '0.0.0.0',
  routes: {
    payload: {
      maxBytes: 1000000 // 1 MB limit
    }
  }
});

const init = async () => {
  try {
    // Inisialisasi model TensorFlow
    await config.loadModel();

    // Registrasi rute
    server.route(predictionRoutes);

    await server.start();
    console.log(`Server running on ${server.info.uri}`);
  } catch (error) {
    console.error('Server initialization error:', error);
    process.exit(1);
  }
};

process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
});

init();