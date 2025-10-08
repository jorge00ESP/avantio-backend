import { Article } from "../domain/Article.entity";
import { IScraperRepository } from "../ports/Scraper.repository";

export class ScraperUseCase {

  constructor(private scraperRepo: IScraperRepository){}

  async fetchElPaisNews(): Promise<Article[]>{
    const articles: Article[] = await this.scraperRepo.getElPaisArticles();

    return articles;
  }
}