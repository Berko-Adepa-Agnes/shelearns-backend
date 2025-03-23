import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import Mustache from 'mustache';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class PuppeteerService {
  constructor() {
    this.browser = null;
  }

  async initialize() {
    this.browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
      defaultViewport: {
        width: 1920,
        height: 1080
      }
    });
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }

  async getScreenshot(url) {
    console.log(`Getting screenshot for ${url}...`);

    if (!this.browser) {
      await this.initialize();
    }

    const page = await this.browser.newPage();

    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
      const screenshot = await page.screenshot({ fullPage: true });
      return screenshot;
    } catch (error) {
      console.error('Error taking screenshot:', error);
      throw error;
    } finally {
      await page.close();
    }
  }

  async getOrStoreScreenshot(roadmapUrl, careerName) {
    if (!careerName) {
      throw new Error('Please provide a valid career name');
    }
    const fileName = `${careerName}.png`;
    const screenshotsDir = path.join(__dirname, '../screenshots');
    const filePath = path.join(screenshotsDir, fileName);

    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }

    if (fs.existsSync(filePath)) {
      console.log('Screenshot already exists:', fileName);
    } else {
      console.log(
        'Screenshot not found. Fetching new screenshot for:',
        careerName
      );
      try {
        const buffer = await this.getScreenshot(roadmapUrl);
        await fs.promises.writeFile(filePath, buffer);
        console.log('Saved new screenshot:', fileName);
      } catch (error) {
        console.error('Error fetching and saving screenshot:', error);
        throw error;
      }
    }
    return `https://4bf2-41-173-33-56.ngrok-free.app/screenshots/${encodeURIComponent(
      fileName
    )}`;
  }

  async generatePDF(career, roadmap) {
    let page = null;

    try {
      const vowels = ['a', 'e', 'i', 'o', 'u'];

      const careerTitleArticle = vowels.includes(
        career.name.charAt(0).toLowerCase()
      )
        ? 'an'
        : 'a';

      const templatePath = path.join(__dirname, '../templates/roadmap.html');

      const template = fs.readFileSync(templatePath, 'utf-8');

      const renderedHTML = Mustache.render(template, {
        careerTitle: career.name,
        careerTitleArticle: careerTitleArticle,
        videoLink: roadmap.video,
        roadmapLink: roadmap.link,
        guide: roadmap.guide
      });

      if (!this.browser) {
        await this.initialize();
      }

      page = await this.browser.newPage();

      await page.setContent(renderedHTML);

      const buffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        preferCSSPageSize: false,
        margin: {
          top: '20px',
          right: '20px',
          bottom: '20px',
          left: '20px'
        }
      });

      return buffer.toString('base64');
    } catch (error) {
      console.error('Error generating PDF:', error);
      throw error;
    } finally {
      if (page) {
        await page.close();
      }
    }
  }
}

export default new PuppeteerService();
