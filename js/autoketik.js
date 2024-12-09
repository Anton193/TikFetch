const inputElement = document.getElementById('url');
const texts = ['https://www.tiktok.com/', 'Enter the URL of your favorite TikTok video'];
let currentTextIndex = 0;
let index = 0;

const typeWriterEffect = () => {
    const currentText = texts[currentTextIndex];
    inputElement.setAttribute('placeholder', currentText.substring(0, index));
    if (index < currentText.length) {
        index++;
        setTimeout(typeWriterEffect, 100);
    } else {
        index = 0;
        currentTextIndex = (currentTextIndex + 1) % texts.length;
        setTimeout(typeWriterEffect, 2000);
    }
};

window.onload = typeWriterEffect;