import { DeleteResult } from "mongoose";
import { ArticleRepository } from "../../ports/Article.repository";

export class DeleteAllArticleUseCase{

  constructor(private articleRepo: ArticleRepository){}

  async execute(): Promise<DeleteResult> {
    return await this.articleRepo.deleteAll();
  }
}