const tf = require('@tensorflow/tfjs-node');

const classifyImage = async (file) => {
    // Konversi file menjadi buffer
    const buffer = await file._data;

    // Decode gambar ke dalam tensor
    const imageTensor = tf.node.decodeImage(buffer, 3)
        .resizeBilinear([224, 224])
        .expandDims(0)
        .toFloat()
        .div(tf.scalar(255.0)); // Normalisasi

    // Load model dari Cloud Storage
    const model = await tf.loadLayersModel('https://<YOUR_BUCKET_URL>/model.json');

    // Lakukan prediksi
    const predictions = model.predict(imageTensor);
    const predictionArray = predictions.dataSync();

    return predictionArray[0]; // Ambil nilai prediksi pertama
};

module.exports = { classifyImage };
