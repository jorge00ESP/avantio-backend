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
      const data: Scraper = await page.evaluate(() => {
        const title: any = document.querySelector('#main-content > header:first-child > div > h1')?.textContent;
        //const title: string = "miau";
        const content: Scraper = {
          title: title
        }

        return content;

      })

      return data;
    } catch(err) {
      console.error('Proccess failed');
      throw(err);
    } finally {
      await browser.close();
    }
  }

}