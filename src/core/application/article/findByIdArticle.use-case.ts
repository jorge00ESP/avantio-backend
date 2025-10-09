import { DeleteResult } from "mongoose";
import { ArticleRepository } from "../../ports/Article.repository";
import { Article } from "../../domain/Article.entity";

export class FindByIdArticleUseCase{

  constructor(private articleRepo: ArticleRepository){}

  async execute(id: string): Promise<Article | null> {
    return await this.articleRepo.findById(id);
  }
}