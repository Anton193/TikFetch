const remobg = require('remove.bg');
const axios = require('axios');
const FormData = require('form-data');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const singleUpload = (req, res) => {
    return new Promise((resolve, reject) => {
        upload.single('image')(req, res, (err) => {
            if (err) return reject(err);
            resolve(req.file);
        });
    });
};

module.exports = async (req, res) => {
    if (req.method === 'GET') {
        res.setHeader('Content-Type', 'text/html');
        return res.end(`
            <html>
                <body>
                    <h1>Remove Background</h1>
                    <form action="" method="POST" enctype="multipart/form-data">
                        <input type="file" name="image" accept="image/*" required />
                        <button type="submit">Upload</button>
                    </form>
                </body>
            </html>
        `);
    }
    if (req.method === 'POST') {
        try {
            const file = await singleUpload(req, res);
            if (!file) {
                return res.end(
                    JSON.stringify({
                        status: "error",
                        message: "harap kirim gambar"
                    }, null, 2)
                );
            }
            const base64Image = file.buffer.toString('base64');
            let apirnobg = [
                "vKaV85HViT5KNnfUyQY3QrjB",
                "QsCQPUi5LP5VJobEJgs27dCD",
                "X7uzNoJVA4cF266R2H5PXgge",
                "fnnPSvFp5w3qw7X8ynnDKbNh",
                "q8qb66SARtnCk65J3NCFR19e",
                "f7uxsHRixvoDjXSPWdF8997W",
                "nscJVLkMfbzxViqfhRomnpgq"
            ];
            const { base64img } = await remobg.removeBackgroundFromImageBase64({
                base64img: base64Image,
                apiKey: apirnobg[Math.floor(Math.random() * apirnobg.length)],
                size: 'auto',
                type: 'auto',
            });
            const buffer = Buffer.from(base64img, 'base64');
            const form = new FormData();
            form.append('image', buffer, {
                filename: 'anton.png',
                contentType: 'image/png',
            });
            const config = {
                headers: {
                    ...form.getHeaders(),
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
                    'Accept': 'application/json, text/plain, */*',
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Connection': 'keep-alive',
                    'Referer': 'https://cloudmage.biz.id',
                    'Origin': 'https://cloudmage.biz.id',
                    'Authorization': `Bearer d1eb3fb2a9a0fb6b34356f5fa1f40`,
                },
            };
            const { data } = await axios.post('https://cloudmage.biz.id/upload.php', form, config);
            if (data && data.data && data.data.url) {
                return res.end(
                    JSON.stringify(
                        {
                            status: 200,
                            author: "AntonThomz",
                            url: data.data.url || "None"
                        }, null, 2
                    )
                );
            } else {
                throw new Error('Gagal mengupload gambar');
            }
        } catch (error) {
            return res.end(
                JSON.stringify(
                    {
                        status: "error",
                        message: `Error: ${error.message}`
                    }, null, 2
                )
            );
        }
    }
};