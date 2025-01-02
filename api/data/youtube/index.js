const axios = require("axios");
const ua = require("../useragent");

async function youtube(url) {
    try {
        const headers = {
            "Access-Control-Allow-Origin": "*",
            Referer: "https://yt.tioo.eu.org/",
            "Referrer-Policy": "no-referrer-when-downgrade",
            "User-Agent": ua[Math.floor(Math.random() * ua.length)]
        };
        const tokenResponse = await axios.get("https://yt.tioo.eu.org/token", { headers });
        const token = tokenResponse.data.token;
        const encodedUrl = encodeURIComponent(url);
        const videoResponse = await axios.get(`https://yt.tioo.eu.org/youtube?url=${encodedUrl}`, {
            headers: {
                ...headers,
                "Authorization-Token": token
            }
        });
        const data = videoResponse?.data?.result;
        return {
            status: 200,
            owner: "AntonThomzz",
            Issues: "https://github.com/AntonThomz",
            data: {
                title: data.title,
                thumbnail: data.image,
                ago: data.ago,
                views: data.views,
                name: data.name,
                mp3: data.mp3,
                mp4: data.mp4
            }
        };
    } catch (error) {
        return {
            status: 500,
            owner: "AntonThomzz",
            Issues: "https://www.facebook.com/profile.php?id=100080355656503",
            message: "Sorry, maybe this project is broken. please report to us the problem"
        };
    }
}

module.exports = { youtube }