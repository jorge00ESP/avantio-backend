import { Router } from 'express';
import { ArticleController } from '../../controllers/article/article.controller';

export class ArticleRoutes {

  public router: Router;

  constructor(private controller: ArticleController){
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', (req, res) => this.controller.findAll(req, res));
    this.router.get('/:id', (req, res) => this.controller.findById(req, res));
    this.router.get('/url/:url', (req, res) => this.controller.findAll(req, res));
    this.router.get('/elpais/fetch', (req, res) => this.controller.getElPaisArticle(req, res));

    this.router.post('/elpais/save', (req, res) => this.controller.savetElPaisArticle(req, res));

    this.router.delete('/', (req, res) => this.controller.deleteAll(req, res));
    this.router.delete('/:id', (req, res) => this.controller.deleteById(req, res));
    this.router.delete('/url/:url', (req, res) => this.controller.deleteByUrl(req, res));
  }

  public getRouter(): Router {
    return this.router;
  }
}