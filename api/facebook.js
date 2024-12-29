const axios = require('axios');
const got = require('got');
const qs = require('qs');
const cheerio = require('cheerio');
const { fbdl } = require('btch-downloader');

module.exports = async (req, res) => {
    const { apikey, url } = req.query;
    if (apikey !== "AntonThomzz") {
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
                    message: 'URL Facebook tidak diberikan.'
                },
                null,
                2
            )
        );
    }
    try {
        const data = await fbdl(url);
        const result = data.HD || data.Normal_video || "-"
        return res.end(
            JSON.stringify(
                {
                    status: 'success',
                    owner: 'AntonThomzz',
                    data: {
                        url: result
                    }
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