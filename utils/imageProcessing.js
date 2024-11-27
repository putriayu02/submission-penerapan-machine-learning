
const sharp = require('sharp');
const tf = require('@tensorflow/tfjs-node');

module.exports = {
  async processImage(payload) {
    try {
      // Baca gambar dan ubah ke array buffer
      const imageBuffer = await payload.file.toBuffer();

      // Resize dan normalisasi gambar sesuai kebutuhan model
      const processedImage = await sharp(imageBuffer)
        .resize(224, 224) // Sesuaikan dengan input model
        .toBuffer();

      // Konversi ke tensor
      const imageTensor = tf.node.decodeImage(processedImage)
        .toFloat()
        .expandDims(0)
        .div(255.0); // Normalisasi

      return imageTensor;
    } catch (error) {
      console.error('Image processing error:', error);
      throw error;
    }
  }
};