import express from 'express';
import { Request, Response } from 'express';
import puppeteer from 'puppeteer';
import { PuppeterRepository } from './infraestructure/scraper/puppeter.repository';
import { ScraperUseCase } from './core/application/Scraper.use-case';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const puppeterRepo = new PuppeterRepository();
const scraperUseCase = new ScraperUseCase(puppeterRepo);

app.listen(PORT, async () => {
  console.log(`Server en puerto ${PORT}`);
  const data = await scraperUseCase.fetchElPaisNews();
  console.log(data);
});