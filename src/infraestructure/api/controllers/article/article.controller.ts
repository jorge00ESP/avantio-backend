import { Request, Response } from "express";
import { DeleteAllArticleUseCase } from "../../../../core/application/article/deleteAllArticle.use-case";
import { DeleteByIdArticleUseCase } from "../../../../core/application/article/deleteByIdArticle.use-case";
import { DeleteByUrlArticleUseCase } from "../../../../core/application/article/deleteByUrlArticle.use-case";
import { FindAllArticleUseCase } from "../../../../core/application/article/findAllArticle.use-case";
import { FindByIdArticleUseCase } from "../../../../core/application/article/findByIdArticle.use-case";
import { FindByUrlArticleUseCase } from "../../../../core/application/article/findByUrlArticle.use-case";
import { GetElPaisArticlesUseCase } from "../../../../core/application/article/getElPaisArticle.use-case";
import { SaveElPaisArticlesUseCase } from "../../../../core/application/article/saveElPaisArticle.use-case";
import { MyResponse } from "../../common/MyResponse";

export class ArticleController {

  private deleteAllArticleUseCase: DeleteAllArticleUseCase;
  private deleteByIdArticleUseCase: DeleteByIdArticleUseCase;
  private deleteByUrlArticleUseCase: DeleteByUrlArticleUseCase;
  private findAllArticleUseCase: FindAllArticleUseCase;
  private findByIdArticleUseCase: FindByIdArticleUseCase;
  private findByUrlArticleUseCase: FindByUrlArticleUseCase;
  private getElPaisArticlesUseCase: GetElPaisArticlesUseCase;
  private saveElPaisArticlesUseCase: SaveElPaisArticlesUseCase;

  constructor(
    deleteAllArticleUseCase: DeleteAllArticleUseCase,
    deleteByIdArticleUseCase: DeleteByIdArticleUseCase,
    deleteByUrlArticleUseCase: DeleteByUrlArticleUseCase,
    findAllArticleUseCase: FindAllArticleUseCase,
    findByIdArticleUseCase: FindByIdArticleUseCase,
    findByUrlArticleUseCase: FindByUrlArticleUseCase,
    getElPaisArticlesUseCase: GetElPaisArticlesUseCase,
    saveElPaisArticlesUseCase: SaveElPaisArticlesUseCase
  ) {
    this.deleteAllArticleUseCase = deleteAllArticleUseCase;
    this.deleteByIdArticleUseCase = deleteByIdArticleUseCase;
    this.deleteByUrlArticleUseCase = deleteByUrlArticleUseCase;
    this.findAllArticleUseCase = findAllArticleUseCase;
    this.findByIdArticleUseCase = findByIdArticleUseCase;
    this.findByUrlArticleUseCase = findByUrlArticleUseCase;
    this.getElPaisArticlesUseCase = getElPaisArticlesUseCase;
    this.saveElPaisArticlesUseCase = saveElPaisArticlesUseCase;
  }

  async deleteAll(req: Request, res: Response){
    try {
      const value = await this.deleteAllArticleUseCase.execute();
      if (value.deletedCount == 0) {
        return res.json(new MyResponse(400, "not deleted", value));
      } else {
        return res.json(new MyResponse(200, "delete succesfully", value));
      }
    } catch (error) {
      console.error("error deleting article");
      throw(error);
    }
  }

  async deleteById(req: Request, res: Response){
    try {
      const value = await this.deleteByIdArticleUseCase.execute(req.params.id);
      if (value.deletedCount == 0) {
        return res.json(new MyResponse(400, "not deleted", value));
      } else {
        return res.json(new MyResponse(200, "delete succesfully", value));
      }
    } catch (error) {
      console.error("error deleting article");
      throw(error);
    }
  }

  async deleteByUrl(req: Request, res: Response){
    try {
      const url = encodeURIComponent(req.query.url as string);
      const value = await this.deleteByUrlArticleUseCase.execute(url);
      if (value.deletedCount == 0) {
        return res.json(new MyResponse(400, "not deleted", value));
      }else {
        return res.json(new MyResponse(200, "delete succesfully", value));
      }
    } catch (error) {
      console.error("error deleting article");
      return res.json(new MyResponse(500, "server error", error));
    }
  }

  async findAll(req: Request, res: Response){
    try {
      const value = await this.findAllArticleUseCase.execute();
      if (value.length == 0) {
        return res.json(new MyResponse(400, "not found anything", value));
      }else {
        return res.json(new MyResponse(200, "all articles", value));
      }
    } catch (error) {
      console.error("error getting articles");
      return res.json(new MyResponse(500, "server error", error));
    }
  }

  async findById(req: Request, res: Response){
    try {
      const value = await this.findByIdArticleUseCase.execute(req.params.id);
      if (!value) {
        return res.json(new MyResponse(400, "not found", value));
      }else {
        return res.json(new MyResponse(200, "article found", value));
      }
    } catch (error) {
      console.error("error getting article");
      return res.json(new MyResponse(500, "server error", error));
    }
  }

  async findByUrl(req: Request, res: Response){
    try {
      const url = encodeURIComponent(req.query.url as string);
      const value = await this.findByUrlArticleUseCase.execute(url);
      if (!value) {
        return res.json(new MyResponse(400, "not found", value));
      }else {
        return res.json(new MyResponse(200, "article found", value));
      }
    } catch (error) {
      console.error("error getting article");
      return res.json(new MyResponse(500, "server error", error));
    }
  }

  async getElPaisArticle(req: Request, res: Response){
    try {
      const value = await this.getElPaisArticlesUseCase.execute();
      return res.json(new MyResponse(200, "article found", value));
    } catch (error) {
      console.error("error getting article");
      return res.json(new MyResponse(500, "server error", error));
    }
  }

  async savetElPaisArticle(req: Request, res: Response){
    try {
      const value = await this.saveElPaisArticlesUseCase.execute();
      return res.json(new MyResponse(200, "articles saved", value));
    } catch (error) {
      console.error("error getting article");
      return res.json(new MyResponse(500, "server error", error));
    }
  }
}