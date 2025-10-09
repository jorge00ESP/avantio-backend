import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { ArticleDBRepository } from './infraestructure/database/repository/ArticleDB.repository';
import { connectToMongo } from './infraestructure/database/connection';
import { SaveElPaisArticlesUseCase } from './core/application/article/saveElPaisArticle.use-case';
import { DeleteAllArticleUseCase } from './core/application/article/deleteAllArticle.use-case';
import { DeleteByIdArticleUseCase } from './core/application/article/deleteByIdArticle.use-case';
import { DeleteByUrlArticleUseCase } from './core/application/article/deleteByUrlArticle.use-case';
import { FindAllArticleUseCase } from './core/application/article/findAllArticle.use-case';
import { FindByIdArticleUseCase } from './core/application/article/findByIdArticle.use-case';
import { FindByUrlArticleUseCase } from './core/application/article/findByUrlArticle.use-case';
import { GetElPaisArticlesUseCase } from './core/application/article/getElPaisArticle.use-case';
import { ArticleController } from './infraestructure/api/controllers/article/article.controller';
import { ArticleRoutes } from './infraestructure/api/routes/article/article.routes';

async function runApp() {

  await connectToMongo();

  const articleRepo = new ArticleDBRepository();

  const deleteAllArticleUseCase = new DeleteAllArticleUseCase(articleRepo);
  const deleteByIdArticleUseCase = new DeleteByIdArticleUseCase(articleRepo);
  const deleteByUrlArticleUseCase = new DeleteByUrlArticleUseCase(articleRepo);
  const findAllArticleUseCase = new FindAllArticleUseCase(articleRepo);
  const findByIdArticleUseCase = new FindByIdArticleUseCase(articleRepo);
  const findByUrlArticleUseCase = new FindByUrlArticleUseCase(articleRepo);
  const getElPaisArticlesUseCase = new GetElPaisArticlesUseCase(articleRepo);
  const saveElPaisArticlesUseCase = new SaveElPaisArticlesUseCase(articleRepo);

  const articleController = new ArticleController(
    deleteAllArticleUseCase,
    deleteByIdArticleUseCase,
    deleteByUrlArticleUseCase,
    findAllArticleUseCase,
    findByIdArticleUseCase,
    findByUrlArticleUseCase,
    getElPaisArticlesUseCase,
    saveElPaisArticlesUseCase,
  );

  const app = express();
  app.use(express.json());

  const articleRoutes = new ArticleRoutes(articleController);
  app.use('/api/article', articleRoutes.getRouter());
  
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, async () => {
    console.log(`Server en puerto ${PORT}`);
  });
}

runApp()