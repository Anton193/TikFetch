// api/generateUserAgent.js

// Daftar User-Agent (ratusan variasi)
const userAgents = {
    desktop: [
        // Windows (Chrome, Firefox, Edge)
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
        'Mozilla/5.0 (Windows NT 11.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:129.0) Gecko/20100101 Firefox/129.0',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:128.0) Gecko/20100101 Firefox/128.0',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:127.0) Gecko/20100101 Firefox/127.0',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Edge/128.0.2739.42 Safari/537.36',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Edge/127.0.2651.86 Safari/537.36',
        'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
        'Mozilla/5.0 (Windows NT 6.1; rv:125.0) Gecko/20100101 Firefox/125.0',
        'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',

        // macOS (Safari, Chrome, Firefox)
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_6_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.6 Safari/605.1.15',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_6_8) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Safari/605.1.15',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_6_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_6_1; rv:129.0) Gecko/20100101 Firefox/129.0',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5; rv:128.0) Gecko/20100101 Firefox/128.0',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_6_8; rv:127.0) Gecko/20100101 Firefox/127.0',

        // Linux (Chrome, Firefox)
        'Mozilla/5.0 (X11; Ubuntu; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
        'Mozilla/5.0 (X11; Fedora; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
        'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:129.0) Gecko/20100101 Firefox/129.0',
        'Mozilla/5.0 (X11; Linux x86_64; rv:128.0) Gecko/20100101 Firefox/128.0',
        'Mozilla/5.0 (X11; Debian; Linux x86_64; rv:127.0) Gecko/20100101 Firefox/127.0'
    ],
    mobile: [
        // Android (Chrome, Samsung Internet, UCBrowser)
        'Mozilla/5.0 (Linux; Android 14; SM-S918B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36',
        'Mozilla/5.0 (Linux; Android 13; SM-G998B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36',
        'Mozilla/5.0 (Linux; Android 12; SM-A525F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36',
        'Mozilla/5.0 (Linux; Android 11; SM-A705F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36',
        'Mozilla/5.0 (Linux; Android 14; SAMSUNG SM-S928B) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/26.0 Chrome/128.0.0.0 Mobile Safari/537.36',
        'Mozilla/5.0 (Linux; Android 13; SAMSUNG SM-G981B) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/25.0 Chrome/127.0.0.0 Mobile Safari/537.36',
        'Mozilla/5.0 (Linux; Android 12; SM-A515F) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/24.0 Chrome/126.0.0.0 Mobile Safari/537.36',
        'Mozilla/5.0 (Linux; U; Android 14; en-us; Pixel 8 Pro Build/UP1A.231005.007) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/128.0.0.0 Mobile Safari/537.36 UCBrowser/13.4.2.1307',
        'Mozilla/5.0 (Linux; U; Android 13; en-us; Pixel 7 Build/TQ3A.230901.001) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/127.0.0.0 Mobile Safari/537.36 UCBrowser/13.4.1.1306',

        // iOS (Safari, Chrome)
        'Mozilla/5.0 (iPhone; CPU iPhone OS 17_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.6 Mobile/15E148 Safari/604.1',
        'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1',
        'Mozilla/5.0 (iPhone; CPU iPhone OS 16_7_8 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1',
        'Mozilla/5.0 (iPhone; CPU iPhone OS 17_6_1 like Mac OS X) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36',
        'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36',
        'Mozilla/5.0 (iPad; CPU OS 17_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.6 Mobile/15E148 Safari/604.1'
    ],
    tablet: [
        // Android Tablet
        'Mozilla/5.0 (Linux; Android 14; SM-T970) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
        'Mozilla/5.0 (Linux; Android 13; SM-T870) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
        'Mozilla/5.0 (Linux; Android 12; SM-T730) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
        'Mozilla/5.0 (Linux; Android 11; SM-T500) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',

        // iPad
        'Mozilla/5.0 (iPad; CPU OS 17_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.6 Mobile/15E148 Safari/604.1',
        'Mozilla/5.0 (iPad; CPU OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1',
        'Mozilla/5.0 (iPad; CPU OS 16_7_8 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1',
        'Mozilla/5.0 (iPad; CPU OS 17_6_1 like Mac OS X) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36'
    ]
};

// Tambahan User-Agent (total ratusan)
for (let i = 110; i <= 150; i++) {
    userAgents.desktop.push(`Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${i}.0.0.0 Safari/537.36`);
    userAgents.desktop.push(`Mozilla/5.0 (Macintosh; Intel Mac OS X 14_${i % 10}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${i}.0.0.0 Safari/537.36`);
    userAgents.desktop.push(`Mozilla/5.0 (X11; Linux x86_64; rv:${i}.0) Gecko/20100101 Firefox/${i}.0`);
    userAgents.mobile.push(`Mozilla/5.0 (Linux; Android ${i % 14 + 1}; SM-G${i}00) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${i}.0.0.0 Mobile Safari/537.36`);
    userAgents.mobile.push(`Mozilla/5.0 (iPhone; CPU iPhone OS ${i % 17 + 1}_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/${i % 17 + 1}.0 Mobile/15E148 Safari/604.1`);
    userAgents.tablet.push(`Mozilla/5.0 (Linux; Android ${i % 14 + 1}; SM-T${i}00) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${i}.0.0.0 Safari/537.36`);
}

// Fungsi untuk memilih User-Agent secara acak
function generateRandomUserAgent() {
    const categories = Object.keys(userAgents);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const agents = userAgents[randomCategory];
    return agents[Math.floor(Math.random() * agents.length)];
}

/**
 * API untuk menghasilkan User-Agent acak
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {void}
 */
module.exports = async (req, res) => {
    try {
        const userAgent = generateRandomUserAgent();

        // Set header JSON
        res.setHeader('Content-Type', 'application/json');
        
        // Kirim response sukses
        return res.status(200).end(JSON.stringify({
            status: 'success',
            ua: userAgent,
            category: Object.keys(userAgents).find(key => userAgents[key].includes(userAgent))
        }, null, 2));
    } catch (error) {
        // Log error untuk debugging
        console.error('Error generating User-Agent:', error.message);

        // Set header JSON
        res.setHeader('Content-Type', 'application/json');
        
        // Kirim response error
        return res.status(500).end(JSON.stringify({
            status: 'error',
            message: 'Gagal membuat User-Agent.'
        }, null, 2));
    }
};
