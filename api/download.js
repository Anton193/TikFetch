const axios = require('axios');

module.exports = async (req, res) => {
    const { url } = req.query;
    if (!url) {
        return res.end(
            JSON.stringify(
                {
                    status: 'error',
                    message: 'URL tidak diberikan.',
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
        handleFileDownload(response, res);
    } catch (error) {
        return res.end(
            JSON.stringify(
                {
                    status: 'error',
                    message: 'Gagal mengunduh file.',
                    details: error.message,
                },
                null,
                2
            )
        );
    }
};
const handleFileDownload = (response, res) => {
    let fileName = 'Anton_Coder';
    const contentDisposition = response.headers['content-disposition'];
    if (contentDisposition) {
        const match = contentDisposition.match(/filename="?(.+?)"?(;|$)/);
        fileName = match ? match[1] : `Anton_Coder`;
    } else {
        const extension = response.headers['content-type'].split('/')[1];
        fileName = `Anton_Coder.${extension}`;
    }
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.setHeader('Content-Type', response.headers['content-type']);
    response.data.pipe(res);
};