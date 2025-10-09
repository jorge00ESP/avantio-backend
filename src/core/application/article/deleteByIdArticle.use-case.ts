import { DeleteResult } from "mongoose";
import { ArticleRepository } from "../../ports/Article.repository";

export class DeleteByIdArticleUseCase{

  constructor(private articleRepo: ArticleRepository){}

  async execute(id: string): Promise<DeleteResult> {
    return await this.articleRepo.deleteById(id);
  }
}