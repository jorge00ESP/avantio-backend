import { DeleteResult } from "mongoose";
import { ArticleRepository } from "../../ports/Article.repository";
import { Article } from "../../domain/Article.entity";

export class FindByUrlArticleUseCase{

  constructor(private articleRepo: ArticleRepository){}

  async execute(url: string): Promise<Article | null> {
    return await this.articleRepo.findByUrl(url);
  }
}