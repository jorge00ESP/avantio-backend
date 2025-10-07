import puppeteer from "puppeteer";
import { Scraper } from "../../core/domain/Scrapper.entity";
import { IScraperRepository } from "../../core/ports/Scraper.repository";

export class PuppeterRepository implements IScraperRepository {
  
  async getNews(url: string): Promise<Scraper>{
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    try{
      await page.goto(url);
      await page.click('#main-content > div:first-child article > header > h2');
      await new Promise(r => setTimeout(r, 5000))
      const data: Scraper = await page.evaluate(() => {
        const title: string | undefined = document.querySelector('#main-content div:first-child h1')?.textContent;
        const description: string | undefined = document.querySelector('#main-content div:first-child p')?.textContent;
        const body: string | undefined = document.querySelector("#main-content div[data-dtm-region='articulo_cuerpo']")?.textContent;

        const content: Scraper = {
          title,
          description,
          body
        }

        return content;
      });

      return data;
    } catch(err) {
      console.error('Proccess failed');
      throw(err);
    } finally {
      await browser.close();
    }
  }

}