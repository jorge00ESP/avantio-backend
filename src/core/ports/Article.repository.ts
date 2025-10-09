import { DeleteResult } from "mongoose";
import { Article } from "../domain/Article.entity";

export interface ArticleRepository {
  getElPaisArticles(): Promise<Article[]>;
  saveElPaisArticles(): Promise<void>;
  findAll(): Promise<Article[]>;
  findById(id: string): Promise<Article | null>;
  findByUrl(url: string): Promise<Article | null>;
  deleteAll(): Promise<DeleteResult>;
  deleteById(id: string): Promise<DeleteResult>;
  deleteByUrl(url: string): Promise<DeleteResult>;
}