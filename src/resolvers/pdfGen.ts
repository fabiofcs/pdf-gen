import fs from "fs";
import path from "path";
import { PDFDocument, StandardFonts } from "pdf-lib";
const PUBLIC_PATH = "src/public";
const TEMPLATE_PATH = `${PUBLIC_PATH}/template.pdf`;
const NEW_CERT_PATH = `${PUBLIC_PATH}/certificate.pdf`;
const USER_NAME = "Fabio Ribeiro de Carvalho";
const POSITION_ADJUST = -100;
const FONT_SIZE = 32;

const adaptUserName = (userName: string) => {
  if (userName.length > 45) {
    userName = userName.slice(0, 45);
  }

  return userName.trim();
}

export const pdfResolver = async () => {
  const userName = adaptUserName(USER_NAME)
  const dataBuffer = fs.readFileSync(path.resolve(TEMPLATE_PATH));
  const srcPdfDoc = await PDFDocument.load(dataBuffer);
  const pdfDoc = await srcPdfDoc.copy();
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const page = pdfDoc.getPage(0);
  page.setFont(helveticaFont);
  const textWidth = helveticaFont.widthOfTextAtSize(userName, FONT_SIZE);
  const textHeight = helveticaFont.heightAtSize(FONT_SIZE);
  const x = (page.getWidth() - textWidth) / 2;
  const y = (page.getHeight() - (textHeight + POSITION_ADJUST)) / 2;

  page.drawText(userName, { x, y, size: FONT_SIZE, font: helveticaFont });
  fs.writeFileSync(NEW_CERT_PATH, await pdfDoc.save());

  console.log("LOG: pdf generated");

  return "Hello World .PDF";
};
