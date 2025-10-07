import { Scraper } from "../domain/Scrapper.entity";
import { IScraperRepository } from "../ports/Scraper.repository";

export class ScraperUseCase {

  constructor(private scraperRepo: IScraperRepository){}

  async fetchNews(url: string): Promise<Scraper>{
    if(!url || !url.startsWith('http') || !url.startsWith('https')){
      throw new Error('URL not available');
    }

    const news = await this.scraperRepo.getNews(url);

    return news;
  }
}