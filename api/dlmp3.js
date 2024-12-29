const axios = require('axios');

module.exports = async (req, res) => {
    const { url } = req.query;
    if (!url) {
        return res.end(
            JSON.stringify(
                {
                    status: 'error',
                    message: 'URL not provided.',
                },
                null,
                2
            )
        );
    }
    try {
        const response = await axios({
            url,
            method: 'GET',
            responseType: 'stream',
            timeout: 15000,
        });
        handleDownload(response, res);
    } catch (error) {
        return res.end(
            JSON.stringify(
                {
                    status: 'error',
                    message: 'Failed to download the file.',
                    details: error.message,
                },
                null,
                2
            )
        );
    }
};

const handleDownload = (response, res) => {
    let fileName = 'audio-alphacoder';
    const contentDisposition = response.headers['content-disposition'];
    if (contentDisposition) {
        const match = contentDisposition.match(/filename="?(.+?)"?(;|$)/);
        fileName = match ? match[1] : 'audio-alphacoder';
    } else {
        const extension = response.headers['content-type'].split('/')[1];
        fileName = `audio-alphacoder.mp3`;
    }
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.setHeader('Content-Type', response.headers['content-type']);
    response.data.pipe(res);
};