import { Article } from "../domain/Article.entity";
import { ArticleRepository } from "../ports/Article.repository";

export class ArticleUseCase{

  constructor(private articleRepo: ArticleRepository){}

  async getElPaisNews(): Promise<Article[]>{
    const articles: Article[] = await this.articleRepo.getElPaisArticles();

    return articles;
  }

  async saveElPaisNews(): Promise<void> {
    await this.articleRepo.saveElPaisArticles();
  }

  async getAll(): Promise<Article[]> {
    return await this.articleRepo.findAll();
  }

  async deleteById(id: string) {
    return await this.articleRepo.deleteById(id);
  }
}