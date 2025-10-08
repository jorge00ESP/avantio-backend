import { Article } from "../domain/Article.entity";

export interface ArticleRepository {
  getElPaisArticles(): Promise<Article[]>;
  saveElPaisArticles(): Promise<void>;
}