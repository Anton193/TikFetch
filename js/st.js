document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('downloadForm');
    const urlInput = document.getElementById('url');
    const resultContainer = document.getElementById('result-container');
    const videoPlayer = document.getElementById('videoPlayer');
    const downloadMP4Button = document.getElementById('downloadMP4');
    const downloadMP3Button = document.getElementById('downloadMP3');
    const errorDiv = document.getElementById('error');
    const tiktokUrlRegex = /^(https?:\/\/)?(www\.)?tiktok\.com\/[^\s]+/;
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const url = urlInput.value.trim();
        if (!url) return showError('URL tidak boleh kosong');
        if (!tiktokUrlRegex.test(url)) return showError('Masukkan URL TikTok yang valid');
        try {
            const videoData = await fetch(`/api/tiktok?url=${encodeURIComponent(url)}`).then(res => res.json());
            if (videoData.status !== 'error') updateUI(videoData.video);
            else showError('Gagal memproses video.');
        } catch {
            showError('Terjadi kesalahan. Silakan coba lagi.');
        }
    });

    function updateUI(video) {
        videoPlayer.src = video.url;
        videoPlayer.load();
        downloadMP4Button.href = `/api/download?url=${video.url}`;
        downloadMP4Button.download = 'anton_video.mp4';
        downloadMP3Button.href = `/api/download?url=${video.music}`;
        downloadMP3Button.download = 'anton_audio.mp3';
        resultContainer.style.display = 'block';
        errorDiv.style.display = 'none';
    }

    function showError(message) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        resultContainer.style.display = 'none';
        errorDiv.style.animation = 'shake 0.5s ease-in-out';
        errorDiv.addEventListener('animationend', () => {
            errorDiv.style.animation = '';
        });
    }
});