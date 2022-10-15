import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import dotenv from "dotenv";
import authRoutes from './routes/auth.routes.js'
import characterRoutes from './routes/character.routes.js'
import moviesRoutes from './routes/movies.routes.js'
import genreRoutes from './routes/genre.routes.js'

dotenv.config()

const { CLIENT_URL } = process.env;

const app = express();
app.use(bodyParser.json());
app.use(morgan('dev'));

// CORS CONFIGURATION
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, authorization, On-behalf-of, x-sg-elas-acl');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

//routes
app.use(authRoutes)
app.use(characterRoutes)
app.use(moviesRoutes)
app.use(genreRoutes)

export default app;