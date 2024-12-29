const axios = require('axios');
const got = require('got');
const qs = require('qs');
const cheerio = require('cheerio');
const { youtube } = require('btch-downloader');

module.exports = async (req, res) => {
    const { url } = req.query;
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