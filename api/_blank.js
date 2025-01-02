module.exports = (req, res) => {
    return res.end(
        JSON.stringify(
            {
                apikey: "AntonThomzz"
            },
            null,
            2
        )
    );
};