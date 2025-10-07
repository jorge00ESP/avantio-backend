import { Scraper } from "../domain/Scrapper.entity";

export interface IScraperRepository {
  getNews(url: string): Promise<Scraper>;
}