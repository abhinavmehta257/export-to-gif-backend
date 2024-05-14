const fs = require("fs");
const GIFEncoder = require("gifencoder");
const { createCanvas, loadImage } = require("canvas");

export default async function convertImagesToGif(
  folderPath,
  outputPath,
  frameDelay,
  repeat
) {
  const canvas = createCanvas(200, 200);
  const ctx = canvas.getContext("2d");
  const encoder = new GIFEncoder(200, 200);
  encoder.createReadStream().pipe(fs.createWriteStream(outputPath));
  encoder.start();
  encoder.setRepeat(repeat); // 0 for repeat, -1 for no-repeat
  encoder.setDelay(frameDelay); // frame delay in ms

  // Read all files from the folder
  const files = await fs.promises.readdir(folderPath);
  // Filter out non-image files (e.g., .DS_Store on macOS)
  const imageFiles = files.filter((file) =>
    /\.(png|jpg|jpeg|gif)$/i.test(file)
  );
  console.log(imageFiles.sort());
  // Loop through each image file and add it to the GIF
  for (const file of imageFiles) {
    const imagePath = `${folderPath}/${file}`;
    const image = await loadImage(imagePath);
    ctx.drawImage(image, 0, 0, 200, 200);
    encoder.addFrame(ctx);
  }

  // Finish creating the GIF
  encoder.finish();
  console.log("GIF created successfully.");
}
