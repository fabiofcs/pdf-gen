import fs from 'fs';
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';

import path from "path";

export const pdfResolver = async () => {
    console.log("Hello World PDF process!!!");
    const dataBuffer = fs.readFileSync(path.resolve("src/public/sample.pdf"));
    const pdfDoc = await PDFDocument.load(dataBuffer);
    //TODO get some template to append some text

    console.log("Hello World PDF after!!!");

    return "Hello World .PDF"
}