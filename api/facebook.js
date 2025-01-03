const { facebook } = require("./data/facebookV1/index");

module.exports = async (req, res) => {
    const { url, apikey } = req.query;
    if (apikey !== "AntonThomzz") {
        return res.end(
            JSON.stringify(
                {
                    status: 'error',
                    errorCode: 'APIKEY_IS_INVALID',
                    timestamp: new Date().toISOString(),
                    message: 'please try again later.'
                },
                null,
                2
            )
        );
    }
    if (!url) {
        return res.end(
            JSON.stringify(
                {
                    status: 'error',
                    errorCode: 'MISSING_URL',
                    timestamp: new Date().toISOString(),
                    message: 'Facebook URL not provided'
                },
                null,
                2
            )
        );
    }
    try {
        const { data } = await facebook(url);
        return res.end(
            JSON.stringify(
                {
                    status: 200,
                    owner: "AntonThomzz",
                    Issues: "https://github.com/AntonThomz",
                    data: {
                        HD: data.HD,
                        SD: data.SD
                    }
                },
                null,
                2
            )
        );
    } catch (err) {
        return res.end(
            JSON.stringify(
                {
                    status: "error",
                    errorCode: "SERVER_ERROR",
                    mwssage: err.message || err,
                },
                null,
                2
            )
        );
    }
};