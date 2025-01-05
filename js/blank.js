document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('downloadForm');
    const urlInput = document.getElementById('url');
    const resultContainer = document.getElementById('result-container');
    const videoPlayer = document.getElementById('videoPlayer');
    const downloadMP4Button = document.getElementById('downloadMP4');
    const downloadMP3Button = document.getElementById('downloadMP3');
    const errorDiv = document.getElementById('error');
    const loadingDiv = document.getElementById('loading');
    const submitBtn = document.getElementById('submitBtn');
    const videoInfoDiv = document.getElementById('videoInfo');
    const videoTitle = document.getElementById('videoTitle');
    const videoRegion = document.getElementById('videoRegion');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const url = urlInput.value.trim();
        const tiktokRegex = /^https?:\/\/([a-z]+\.)?tiktok\.com\/.+/;

        if (!url) {
            return showError('Please enter a valid TikTok URL.');
        }

        if (!tiktokRegex.test(url)) {
            return showError('The URL is not a valid TikTok link.');
        }

        toggleLoading(true);

        try {
            const videoData = await fetch(`/api/tiktok?url=${encodeURIComponent(url)}`)
                .then((res) => res.json());

            if (videoData.status !== 'error') {
                updateUI(videoData.data);
            } else {
                showError('Failed to process the video.');
            }
        } catch {
            showError('An error occurred. Please try again.');
        } finally {
            toggleLoading(false);
        }
    });

    function updateUI(data) {
        videoPlayer.src = data.url;
        videoPlayer.load();
        downloadMP4Button.href = `/api/dlmp4?url=${data.url}`;
        downloadMP4Button.download = 'anton_video.mp4';
        downloadMP3Button.href = `/api/dlmp3?url=${data.music}`;
        downloadMP3Button.download = 'anton_audio.mp3';
        resultContainer.style.display = 'block';
        errorDiv.style.display = 'none';
        videoTitle.textContent = data.title || 'Untitled Video';
        videoRegion.textContent = `Region: ${data.region || 'N/A'}`;
        videoInfoDiv.style.display = 'block';
    }

    function showError(message) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        resultContainer.style.display = 'none';
    }

    function toggleLoading(state) {
        loadingDiv.style.display = state ? 'block' : 'none';
        submitBtn.disabled = state;
    }
});