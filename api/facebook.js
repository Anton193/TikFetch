const axios = require('axios');
const cheerio = require('cheerio');
const cookie = require('cookie');
const fetch = require('node-fetch');
const fileType = require('file-type');
const publish = require('publish');
const qs = require('qs');
const request = require('request');
const url = require('url');
const bochilScraper = require('@bochilteam/scraper');
const ytSearch = require('yt-search');
const ytdl = require('ytdl-core');
const facebook = require("./data/fbdl");

module.exports = async (req, res) => {
    const { url } = req.query;
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
        const { data } = await facebook(url);
        if (data) {
            return res.end(
                JSON.stringify(
                    {
                        status: 'success',
                        owner: 'Anton Thomzz',
                        data: {
                            url: data
                        }
                    },
                    null,
                    2
                )
            );
        } else {
            return res.end(
                JSON.stringify(
                    {
                        status: 'error',
                        errorCode: 'NO_VIDEO',
                        timestamp: new Date().toISOString(),
                        message: 'Video tidak ditemukan.'
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