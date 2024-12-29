process.removeAllListeners('warning');
const dylux = require("api-dylux");

module.exports = async (req, res) => {
    const { apikey, url } = req.query;
    if (apikey !== "AlphaCoder03") {
        return res.end(
            JSON.stringify(
                {
                    status: 'error',
                    errorCode: 'INVALID_API_KEY',
                    message: 'API Key tidak valid.',
                    timestamp: new Date().toISOString(),
                    details: 'Pastikan Apikey Sudah Benar.',
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
                    message: 'URL Facebook tidak diberikan.'
                },
                null,
                2
            )
        );
    }
    try {
        const result = await dylux.fbdl(url);
        if (result?.videoUrl) {
            return res.end(
                JSON.stringify(
                    {
                        status: 'success',
                        owner: 'Anton Thomzz',
                        data: {
                            url: result?.videoUrl || "-"
                        }
                    },
                    null,
                    2
                )
            );
        }
    } catch (err) {
        return res.end(
            JSON.stringify(
                {
                    status: "error",
                    errorCode: "SERVER_ERROR",
                    message: "Terjadi kesalahan pada server.",
                    timestamp: new Date().toISOString(),
                    details: err.message || err
                },
                null,
                2
            )
        );
    }
};