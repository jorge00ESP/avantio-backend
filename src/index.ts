import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { ArticleDBRepository } from './infraestructure/database/repository/ArticleDB.repository';
import { ArticleUseCase } from './core/application/Article.use-case';
import { connectToMongo } from './infraestructure/database/connection';

async function runApp() {

  await connectToMongo();

  const ARTICLE_REPO = new ArticleDBRepository();
  const ARTICLE_USE_CASE = new ArticleUseCase(ARTICLE_REPO);

  const app = express();
  app.use(express.json());
  
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, async () => {
    console.log(`Server en puerto ${PORT}`);
    const DATA = await ARTICLE_USE_CASE.saveElPaisNews();
    //console.log(DATA);
  });
}

runApp()