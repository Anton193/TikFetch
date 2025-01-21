const axios = require('axios');
const FormData = require('form-data');
const fs = require("fs");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

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
                    <h1>Remini Image</h1>
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
            const image = fs.readFileSync(file.path);
            const formData = new FormData();
            formData.append("model_version", "1");
            formData.append("image", image, "anton.jpg");
            const response = await axios.post(
                `https://inferenceengine.vyro.ai/enhance`,
                formData,
                {
                    headers: {
                        ...formData.getHeaders(),
                        'User-Agent': 'okhttp/4.9.3',
                        'Connection': 'Keep-Alive',
                        'Accept-Encoding': 'gzip',
                    },
                    responseType: 'arraybuffer',
                }
            );
            const form = new FormData();
            form.append('image', response.data, {
                filename: 'output-image.png',
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
            if (data.data.url || data) {
                return res.end(
                    JSON.stringify(
                        {
                            status: 200,
                            author: "AntonThomz",
                            url: data.data.url || "None"
                        }, null, 2
                    )
                );
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