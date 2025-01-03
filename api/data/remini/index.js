const axios = require('axios');
const FormData = require('form-data');

async function remini(imageBuffer, model = 'enhance') {
  const validModels = ['enhance', 'recolor', 'dehaze'];
  if (!validModels.includes(model)) {
    throw new Error(`Invalid model selected. Valid options are: ${validModels.join(', ')}`);
  }

  const formData = new FormData();
  formData.append('model_version', '1');
  formData.append('image', imageBuffer, 'enhance_image_body.jpg');

  try {
    const response = await axios.post(
      `https://inferenceengine.vyro.ai/${model}`,
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
    return response.data;
  } catch (error) {
    console.error('Error processing image:', error.message);
    throw new Error('Failed to process image. Please try again later.');
  }
}

module.exports = remini;