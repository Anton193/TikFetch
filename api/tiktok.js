const axios = require('axios');

const { 
  formatNumber, 
  getRegionName,
  formatFileSize, 
  formatDuration,
} = require("./data/utils");

module.exports = async (req, res) => {
    const params = req.method === 'POST' ? req.body : req.query;
    const { url, apikey } = params;
    if (apikey !== "AntonThomzz") {
        return res.end(
            JSON.stringify(
                {
                    status: 'error',
                    message: 'INVALID_API_KEY',
                    timestamp: new Date().toISOString()
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
                    message: 'MISSING_URL',
                    timestamp: new Date().toISOString()
                },
                null,
                2
            )
        );
    }
    try {
        const response = await axios.get(
            `https://tikwm.com/api/`,
            {
                params: {
                    url
                },
            }
        );
        const data = response.data?.data;
        if (data?.play || data) {
            return res.end(
                JSON.stringify(
                    {
                        status: 'success',
                        owner: 'Anton Thomzz',
                        video: {
                             id: data.id,
                             title: data.title,
                             play: formatNumber(data.play_count),
                             likes: formatNumber(data.digg_count),
                             comment: formatNumber(data.comment_count),
                             share: formatNumber(data.share_count),
                             download: formatNumber(data.download_count),
                             favorit: formatNumber(data.collect_count),
                             upload: new Date(data.create_time * 1000).toISOString(),
                             region: getRegionName(data.region),
                             duration: formatDuration(data.duration),
                             size: formatFileSize(data.size),
                             wmsize: formatFileSize(data.wm_size),
                             url: data.play,
                             wmplay: data.wmplay,
                             music: data.music,
                             info_music: {
                                  id: data.music_info.id,
                                  play: data.music_info.play,
                                  title: data.music_info.title,
                                  cover: data.music_info.cover,
                                  author: data.music_info.author,
                                  duration: formatDuration(data.music_info.duration),
                                  album: data.music_info.album || '-'
                             },
                        },
                        images: data.images
                    },
                    null,
                    2
                )
            );
        }
    } catch (err) {
        return res.end(
            JSON.stringify(
                {
                    status: "error",
                    errorCode: "SERVER_ERROR",
                    message: err.message || err
                },
                null,
                2
            )
        );
    }
};