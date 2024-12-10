const detectHTMLScraper = require('../middleware');

module.exports = async (req, res) => {
    await new Promise((resolve, reject) => {
        detectHTMLScraper(req, res, (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
    res.status(200).send('Hello from the API route!');
};