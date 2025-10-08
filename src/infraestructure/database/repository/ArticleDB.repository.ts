import puppeteer from "puppeteer";
import { Article } from "../../../core/domain/Article.entity";
import { ArticleRepository } from "../../../core/ports/Article.repository";
import ARTICLE_MODEL from "../models/ArticleDB.model";

export class ArticleDBRepository implements ArticleRepository {

  async findAll(): Promise<Article[]> {
    try {
      return await ARTICLE_MODEL.find({});
    } catch (error) {
      console.error('Insert articles failed');
      throw(error);
    }
  }

  async saveElPaisArticles(): Promise<void> {
    try {
      const ARTICLES: Article[] = await this.getElPaisArticles();
      await ARTICLE_MODEL.insertMany(ARTICLES);
      console.log("Articles inserted succesfully");
    } catch (error) {
      console.error('Insert articles failed');
      throw(error);
    }
  }
  
  async getElPaisArticles(): Promise<Article[]>{
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    try{
      await page.goto("https://elpais.com");
      await new Promise(r => setTimeout(r, 3000));
      const links: any[] = await page.evaluate(() => {
        return [
          document.querySelector("#main-content > div:first-child article > header > h2 > a")?.getAttribute("href"),
          document.querySelector("#main-content > div:first-child article:nth-child(2) > header > h2 > a")?.getAttribute("href"),
          document.querySelector("#main-content > div > section > div:nth-child(2) > article > header > h2 > a")?.getAttribute('href'),
          document.querySelector("#main-content > div > section > div:nth-child(3) > div > article > header > h2 > a")?.getAttribute("href"),
          document.querySelector("#main-content > div > section > div:nth-child(3) > div > article:nth-child(2) > header > h2 > a")?.getAttribute("href")
        ]
      });
      let articles: Article[] = [];
      console.log(links);
      
      for (let i = 0; i < 5; i++) {
        await page.goto(links[i]);
        await new Promise(r => setTimeout(r, 3000));
        const data: Article = await page.evaluate(() => {
          const title: string | undefined = document.querySelector('#main-content div:first-child h1')?.textContent;
          const description: string | undefined = document.querySelector('#main-content div:first-child p')?.textContent;
          const body: string | undefined = document.querySelector("#main-content div[data-dtm-region='articulo_cuerpo']")?.textContent;
          const content: Article = {
            title: title || "Not found",
            description: description || "Not found",
            body: body || "Not found",
            url: ""
          }

          return content;
        });

        data.url = links[i];
        articles.push(data);
        await new Promise(r => setTimeout(r, 5000));
      }

      await browser.close();

      return articles;
    } catch(error) {
      console.error('Proccess failed');
      throw(error);
    } finally {
      await browser.close();
    }
  }
}