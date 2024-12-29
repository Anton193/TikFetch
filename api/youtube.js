const { youtube } = require('btch-downloader');

module.exports = async (req, res) => {
    const { apikey, url } = req.query;
    if (apikey !== "AntonGanteng") {
        return res.end(
            JSON.stringify(
                {
                    status: 'error',
                    errorCode: 'INVALID_API_KEY',
                    message: 'API Key tidak valid.',
                    timestamp: new Date().toISOString(),
                    details: 'Periksa API Key yang Anda kirimkan dan pastikan itu benar.',
                },
                null,
                2
            )
        );
    }
    if (!url) {
        return res.end(
            JSON.stringify(
                {
                    status: 'error',
                    errorCode: 'MISSING_URL',
                    timestamp: new Date().toISOString(),
                    message: 'URL YouTube tidak diberikan.'
                },
                null,
                2
            )
        );
    }
    try {
        const datayt = await youtube(url);
        return res.end(
            JSON.stringify(
                {
                    status: 'success',
                    owner: 'Anton',
                    data: datayt
                },
                null,
                2
            )
        );
    } catch (err) {
        return res.end(
            JSON.stringify(
                {
                    status: "error",
                    errorCode: "SERVER_ERROR",
                    message: "Terjadi kesalahan pada server.",
                    details: err.message || err,
                },
                null,
                2
            )
        );
    }
};