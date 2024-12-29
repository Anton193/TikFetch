const axios = require("axios");
const cheerio = require("cheerio");
const cookie = require("cookie");
const fetch = require("fetch");
const nodeFetch = require("node-fetch");
const publish = require("publish");
const qs = require("qs");
const request = require("request");
const url = require("url");
const { scraper } = require("@bochilteam/scraper");
const ytSearch = require("yt-search");
const ytdlCore = require("ytdl-core");
const dylux = require("api-dylux");

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
        const datayt = await dylux.fbdl(url);
        return res.end(
            JSON.stringify(
                {
                    status: 'success',
                    owner: 'Anton',
                    data: datayt.videoUrl || datayt
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