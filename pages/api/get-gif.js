// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import path from "path";
import fs from "fs/promises";
import convertImagesToGif from "../../helper/gif";
export default (req, res) => {
  const framesPath = path.join(process.cwd(), "/public/images");
  const gifPath = path.join(process.cwd(), "/public/gifs.gif");
  convertImagesToGif(framesPath, gifPath, 8, 0);
  res.status(200).json({ name: "John Doe" });
};
