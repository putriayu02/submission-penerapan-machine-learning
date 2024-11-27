const { v4: uuidv4 } = require('uuid');
const tf = require('@tensorflow/tfjs-node');
const sharp = require('sharp');
const tensorflowConfig = require('../config/tensorflowConfig');
const { processImage } = require('../utils/imageProcessing');
const { successResponse, errorResponse } = require('../utils/responseFormatter');

const predictionHandler = {
  async predict(request, h) {
    try {
      const { payload } = request;
      const model = tensorflowConfig.getModel();

      // Proses gambar
      const processedImage = await processImage(payload);

      // Prediksi dengan model
      const tensor = tf.tensor(processedImage);
      const prediction = model.predict(tensor);
      const predictionData = prediction.dataSync();

      // Interpretasi prediksi (misalnya, ambang batas 50)
      const isCancer = predictionData[0] > 0.5;

      // Buat respons sesuai prediksi
      const responseData = {
        id: uuidv4(),
        result: isCancer ? 'Cancer' : 'Non-cancer',
        suggestion: isCancer 
          ? 'Segera periksa ke dokter!' 
          : 'Penyakit kanker tidak terdeteksi.',
        createdAt: new Date().toISOString()
      };

      return h.response(successResponse(responseData)).code(200);
    } catch (error) {
      console.error('Prediction error:', error);
      return h.response(errorResponse('Terjadi kesalahan dalam melakukan prediksi')).code(400);
    }
  }
};

module.exports = predictionHandler;