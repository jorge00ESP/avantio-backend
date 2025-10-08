import { Article } from "../domain/Article.entity";

export interface IScraperRepository {
  getElPaisArticles(): Promise<Article[]>;
}