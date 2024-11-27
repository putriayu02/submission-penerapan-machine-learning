const { v4: uuidv4 } = require('uuid');
const tf = require('@tensorflow/tfjs-node');
const { classifyImage } = require('../utils/tensorflow');

const predictHandler = async (request, h) => {
    try {
        const { image } = request.payload;

        // Validasi tipe file dan ukuran
        if (!image || !image.hapi || image.hapi.headers['content-type'].indexOf('image/') !== 0) {
            return h.response({
                status: 'fail',
                message: 'File harus berupa gambar',
            }).code(400);
        }

        // Load gambar sebagai Tensor
        const tensor = await classifyImage(image);

        // Prediksi
        const prediction = tensor > 0.5 ? 'Cancer' : 'Non-cancer';
        const suggestion = prediction === 'Cancer'
            ? 'Segera periksa ke dokter!'
            : 'Penyakit kanker tidak terdeteksi.';

        // Response
        const result = {
            id: uuidv4(),
            result: prediction,
            suggestion,
            createdAt: new Date().toISOString(),
        };

        return h.response({
            status: 'success',
            message: 'Model is predicted successfully',
            data: result,
        }).code(200);
    } catch (error) {
        console.error(error);
        return h.response({
            status: 'fail',
            message: 'Terjadi kesalahan dalam melakukan prediksi',
        }).code(400);
    }
};

module.exports = predictHandler;
