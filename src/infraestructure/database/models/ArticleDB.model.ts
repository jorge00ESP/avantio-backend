import mongoose, {Document, Model} from "mongoose";
import { Article } from "../../../core/domain/Article.entity";

export interface ArticleDB extends Article, Document {
  _id: mongoose.Types.ObjectId;
}

const ARTICLE_DB_SCHEMA = new mongoose.Schema({
  title: { type: String, require: true },
  description: { type: String, require: true },
  body: { type: String, require: true },
  url: { type: String, require: true }
})

const ARTICLE_MODEL: Model<ArticleDB> = mongoose.model<ArticleDB>('Article', ARTICLE_DB_SCHEMA);

export default ARTICLE_MODEL;