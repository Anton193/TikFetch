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