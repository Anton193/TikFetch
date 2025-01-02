const axios = require('axios');
const cheerio = require('cheerio');

async function facebook(url) {
    try {
        const { data } = await axios.post('https://getmyfb.com/process', new URLSearchParams({
            id: decodeURIComponent(url),
            locale: 'en'
        }), {
            headers: {
                'accept': 'application/json',
                'accept-language': 'en-US,en;q=0.9',
                'content-type': 'application/x-www-form-urlencoded',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'origin': 'https://getmyfb.com',
                'referer': 'https://getmyfb.com/',
                'upgrade-insecure-requests': '1',
                'accept-encoding': 'gzip, deflate, br',
                'connection': 'keep-alive',
            }
        });        
        const $ = cheerio.load(data);
        const qualities = {};
        $('li.results-list-item').each((index, element) => {
            const qualityText = $(element).text().trim();
            const link = $(element).find('a').attr('href');
            if (qualityText && link) {
                const quality = qualityText.split('(')[0].trim();
                const key = quality === '720p' ? 'HD' : (quality === '360p' ? 'SD' : quality);
                qualities[key] = {
                    quality: `${quality} (${key})`,
                    url: link,
                    shouldRender: false
                };
            }
        });
        if (Object.keys(qualities).length === 0) return console.error("No download links found.");
        return {
            status: 200,
            owner: "AntonThomzz",
            issues: "https://github.com/AntonThomz",
            data: {
                HD: qualities.HD || null,
                SD: qualities.SD || null
            }
        };
    } catch (error) {
        return {
            status: 500,
            owner: 'AntonThomzz',
            message: 'Error',
            error: error.message
        };
    }
}

module.exports = { facebook };