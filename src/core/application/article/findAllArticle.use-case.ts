import { DeleteResult } from "mongoose";
import { ArticleRepository } from "../../ports/Article.repository";
import { Article } from "../../domain/Article.entity";

export class FindAllArticleUseCase{

  constructor(private articleRepo: ArticleRepository){}

  async execute(): Promise<Article[]> {
    return await this.articleRepo.findAll();
  }
}