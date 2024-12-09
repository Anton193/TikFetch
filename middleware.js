const detectBot = (userAgent) => {
    const knownBots = /curl|wget|python|axios|node-fetch|java|php|go-http-client|postman|scrapy|httpclient/i;
    const allowedBots = /googlebot|bingbot|duckduckbot|baiduspider|yandexbot/i;
    return knownBots.test(userAgent) && !allowedBots.test(userAgent);
};

module.exports = (req, res) => {
    const userAgent = req.headers['user-agent'] || '';
    const requestPath = req.originalUrl || req.url;
    if (/googlebot|bingbot|duckduckbot|baiduspider|yandexbot/i.test(userAgent)) {
        return res.next();
    }
    if (requestPath.startsWith('/api/tiktok')) {
        return res.next();
    }
    if (detectBot(userAgent)) {
        return res.status(403).send('Tunggu 100 tahun lagi, sabar ya!');
    }
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Cache-Control', 'no-cache, must-revalidate');
    return res.next();
};