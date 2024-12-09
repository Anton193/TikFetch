const express = require("express");
const path = require("path");
const infogempaAPI = require("./api/tiktok");
const download = require("./api/download");
const detectHTMLScraper = require("./middleware");

const app = express();
const PORT = 3000;

app.use(detectHTMLScraper);

app.use(express.static(path.join(__dirname)));
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});
app.get("/api/tiktok", infogempaAPI);
app.get("/api/download", download);
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});