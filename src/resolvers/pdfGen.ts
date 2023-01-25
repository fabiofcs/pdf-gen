import fs from "fs";
import * as pdf from 'html-pdf';
import handlebars from "handlebars";

const PUBLIC_PATH = "src/public";
const TEMPLATE_HTML_PATH = `${PUBLIC_PATH}/certificate-template.hbs`;
const userNameMocked = "Hello World PDF! ";
const pdfConfig: pdf.CreateOptions = {
  width: "470px",
  height: "362px",
  type: "pdf",
};

function useHandlebars(template: string) {
  const handlebarsTemplate = handlebars.compile(template);

  return handlebarsTemplate({ userName: userNameMocked });
}

function generatePdf(html: string): Promise<any> {
  return new Promise((resolve, reject) => {
    pdf.create(html, pdfConfig).toBuffer((err, buffer) => {
      if (err) {
        reject(err);
      } else {
        resolve(buffer);
      }
    });
  });
}

export async function pdfResolver() {
  const htmlTemplate = fs.readFileSync(TEMPLATE_HTML_PATH, "utf8");

  const handlebarsTemplate = useHandlebars(htmlTemplate);
  console.log("LOG: template with handlebars", handlebarsTemplate);

  const pdfBuffer = await generatePdf(handlebarsTemplate);
  const pdfBase64 = pdfBuffer.toString('base64');

  return pdfBase64;
};
