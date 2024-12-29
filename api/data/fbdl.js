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
const fg = require("api-dylux");

const facebook = async (url) => {
    try {
        const response = await fg.fbdl(url);

        if (!response || !response.videoUrl) {
            throw new Error('Video URL not found in the response');
        }

        const data = response.videoUrl;
        return {
            data
        };
    } catch (err) {
        console.error("Error: ", err.message || err);
        return { error: err.message || 'An unknown error occurred' };
    }
};

module.exports = facebook;