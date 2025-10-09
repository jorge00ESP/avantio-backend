import { DeleteResult } from "mongoose";
import { ArticleRepository } from "../../ports/Article.repository";
import { Article } from "../../domain/Article.entity";

export class FindByUrlArticleUseCase{

  constructor(private articleRepo: ArticleRepository){}

  async execute(): Promise<void> {
    return await this.articleRepo.saveElPaisArticles();
  }
}