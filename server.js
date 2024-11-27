const Hapi = require('@hapi/hapi');
const predictHandler = require('./handlers/predictHandler');

const init = async () => {
    const server = Hapi.server({
        port: 8080,
        host: '0.0.0.0',
        routes: {
            cors: true,
        },
    });

    // Routes
    server.route([
        {
            method: 'POST',
            path: '/predict',
            options: {
                payload: {
                    output: 'stream',
                    parse: true,
                    multipart: true,
                    maxBytes: 1000000, // 1MB
                },
            },
            handler: predictHandler,
        },
    ]);

    await server.start();
    console.log(`Server running on ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
