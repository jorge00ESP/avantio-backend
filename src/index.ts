import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { PuppeterRepository } from './infraestructure/scraper/puppeter.repository';
import { ScraperUseCase } from './core/application/Scraper.use-case';
import { connectToMongo } from './infraestructure/database/connection';

async function runApp() {

  await connectToMongo();

  const puppeterRepo = new PuppeterRepository();
  const scraperUseCase = new ScraperUseCase(puppeterRepo);

  const app = express();
  app.use(express.json());
  
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, async () => {
    console.log(`Server en puerto ${PORT}`);
    const data = await scraperUseCase.fetchElPaisNews();
    //console.log(data);
  });
}

runApp()