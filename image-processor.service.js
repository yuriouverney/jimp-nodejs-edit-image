const Jimp = require('jimp');

class ImageProcessorService {
  constructor(imagePath) {
    this.imagePath = imagePath;
  }

  async processImage() {
    try {
      const image = await this.loadImage();
      const imageWidth = image.getWidth();
      const imageHeight = image.getHeight();

      // CALCULETES THE COORDINATES FOR THE RECTANGLE
      const rectWidth = imageWidth;
      const rectHeight = 100;
      const rectX = 0;
      const rectY = imageHeight - rectHeight;

      // CREATE A RECTANGLE
      const white = Jimp.rgbaToInt(255, 255, 255, 255);
      image.scan(rectX, rectY, rectWidth, rectHeight, (x, y, idx) => {
        image.bitmap.data.writeUInt32BE(white, idx);
      });

      // ADD TEXT ON RECTANGLE
      const font = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
      const maxWidth= rectWidth
      const maxHeight= rectHeight
        const firstLineMessage = 'HI, TEST ONE'
        const secondLineMessage = 'HI, TEST TWO'
        // load font from .fnt file
        image.print(font, Jimp.HORIZONTAL_ALIGN_LEFT, rectY, firstLineMessage); // print a message on an image. message can be a any type
        image.print(font, Jimp.HORIZONTAL_ALIGN_LEFT, rectY + 20, secondLineMessage, maxWidth); // print a message on an image with text wrapped at maxWidth

      return image;
    } catch (error) {
      console.error('Image processing error:', error);
      throw error;
    }
  }

  async loadImage() {
    try {
      const image = await Jimp.read(this.imagePath);
      return image;
    } catch (error) {
      console.error('Image processing error:', error);
      throw error;
    }
  }

  async saveImage(outputPath) {
    try {
      const processedImage = await this.processImage();
      await processedImage.writeAsync(outputPath);
      console.log('Processed image saved to:', outputPath);
    } catch (error) {
      console.error('Error saving processed image:', error);
      throw error;
    }
  }

  async execute(outputPath) {
    try {
      await this.saveImage(outputPath);
    } catch (error) {
      console.error('Image processing error:', error);
    }
  }
}

// Run class in Node.js terminal
// node image-processor.service.js images/test.jpg images/imagem_processada.jpg
if (process.argv.length < 4) {
  console.error('Enter the path to the image and the output path as arguments.');
} else {
  const imagePath = process.argv[2];
  const outputPath = process.argv[3];
  const processor = new ImageProcessorService(imagePath);
  processor.execute(outputPath);
}

module.exports = ImageProcessorService;