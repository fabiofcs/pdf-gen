import fs from "fs";
import handlebars from "handlebars";
import puppeteer from "puppeteer";

const PUBLIC_PATH = "src/public";
const TEMPLATE_HTML_PATH = `${PUBLIC_PATH}/certificate-template.hbs`;
const mockDate = new Intl.DateTimeFormat("en-US", { day: "numeric", month: "long", year: "numeric" }).format(new Date());
const contextHandlebarsTemplate = {
  firstName: "Hello",
  lastName: "World",
  trainingName: "Test training",
  companyName: "Compacting FETTE",
  createdCertDate: mockDate
}

function useHandlebars(template: string) {
  const handlebarsTemplate = handlebars.compile(template);

  return handlebarsTemplate(contextHandlebarsTemplate);
}

async function htmlToPdf(html: string): Promise<Buffer> {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html);
  const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true, height: "200px" });
  await browser.close();
  return pdfBuffer;
}

export async function pdfResolver() {
  const htmlTemplate = fs.readFileSync(TEMPLATE_HTML_PATH, "utf8");
  const handlebarsTemplate = useHandlebars(htmlTemplate);
  console.log("LOG: template with handlebars", handlebarsTemplate);
  const pdfBuffer = await htmlToPdf(handlebarsTemplate);

  return pdfBuffer.toString("base64");
};
