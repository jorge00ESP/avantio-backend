import express from 'express';
import { Request, Response } from 'express';
import puppeteer from 'puppeteer';
import { PuppeterRepository } from './infraestructure/scraper/puppeter.repository';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const puppeterRepo = new PuppeterRepository();

app.listen(PORT, async () => {
  console.log(`Server en puerto ${PORT}`);
  const data = await puppeterRepo.getNews("https://elpais.com");
  console.log(data);
});