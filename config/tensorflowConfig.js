const tf = require('@tensorflow/tfjs-node');
const path = require('path');

let model;

module.exports = {
  loadModel: async () => {
    const modelPath = path.resolve(__dirname, '../../ml-models/cancer-detection-model');
    try {
      model = await tf.loadLayersModel(`file://${modelPath}/model.json`);
      console.log('Model loaded successfully');
      return model;
    } catch (error) {
      console.error('Model loading failed:', error);
      throw error;
    }
  },

  getModel: () => {
    if (!model) {
      throw new Error('Model not loaded');
    }
    return model;
  }
};