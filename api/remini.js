const remini = require("./data/remini/index");
const formidable = require("formidable");
const fs = require("fs");

module.exports = async (req, res) => {
    if (req.method !== "POST") {
        return res.writeHead(405, { "Content-Type": "application/json" }).end(
            JSON.stringify(
                {
                    status: "error",
                    errorCode: "METHOD_NOT_ALLOWED",
                    message: "Only POST requests are allowed",
                },
                null,
                2
            )
        );
    }
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
        if (!files.image) {
            return res.writeHead(400, { "Content-Type": "application/json" }).end(
                JSON.stringify(
                    {
                        status: "error",
                        errorCode: "MISSING_IMAGE",
                        timestamp: new Date().toISOString(),
                        message: "No image file uploaded.",
                    },
                    null,
                    2
                )
            );
        }
        try {
            const imageBuffer = fs.readFileSync(files.image.filepath);
            const enhancedImage = await remini(imageBuffer, "enhance");
            res.writeHead(200, {
                "Content-Type": "image/jpeg",
                "Content-Disposition": "inline; filename=Anton.jpg",
            });
            return res.end(enhancedImage);
        } catch (error) {
            return res.writeHead(500, { "Content-Type": "application/json" }).end(
                JSON.stringify(
                    {
                        status: "error",
                        errorCode: "SERVER_ERROR",
                        message: error.message || "Failed to process image.",
                    },
                    null,
                    2
                )
            );
        }
    });
};