import puppeteer from "puppeteer";
import { Article } from "../../../core/domain/Article.entity";
import { ArticleRepository } from "../../../core/ports/Article.repository";
import ARTICLE_MODEL from "../models/ArticleDB.model";
import { DeleteResult } from "mongoose";

export class ArticleDBRepository implements ArticleRepository {
  
  async findById(id: string): Promise<Article | null> {
    try {
      return await ARTICLE_MODEL.findById(id);
    } catch (error) {
      console.error('Find article by id failed');
      throw(error);
    }
  }
  
  async findByUrl(url: string): Promise<Article | null> {
    try {
      const decodedUrl = decodeURIComponent(url);
      return await ARTICLE_MODEL.findOne({ url: decodedUrl });
    } catch (error) {
      console.error('Find article by url failed');
      throw(error);
    }
  }
  
  async deleteAll(): Promise<DeleteResult> {
    try {
      return await ARTICLE_MODEL.deleteMany();
    } catch (error) {
      console.error('Find article by url failed');
      throw(error);
    }
  }
  
  async deleteById(id: string): Promise<DeleteResult> {
    try {
      return await ARTICLE_MODEL.deleteOne({_id: id});
    } catch (error) {
      console.error('Find article by url failed');
      throw(error);
    }
  }
  
  async deleteByUrl(url: string): Promise<DeleteResult> {
    try {
      const decodedUrl = decodeURIComponent(url);
      return await ARTICLE_MODEL.deleteOne({ url: decodedUrl });
    } catch (error) {
      console.error('Find article by url failed');
      throw(error);
    }
  }
  

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
      const articles: Article[] = await this.getElPaisArticles();
      await ARTICLE_MODEL.insertMany(articles);
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
      
      for (let i = 0; i < links.length; i++) {
        await page.goto(links[i]);
        await new Promise(r => setTimeout(r, 5000));
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