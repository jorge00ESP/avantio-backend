import { DeleteResult } from "mongoose";
import { ArticleRepository } from "../../ports/Article.repository";

export class DeleteByUrlArticleUseCase{

  constructor(private articleRepo: ArticleRepository){}

  async execute(url: string): Promise<DeleteResult> {
    return await this.articleRepo.deleteByUrl(url);
  }
}