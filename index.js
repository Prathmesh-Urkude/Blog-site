import express from 'express';
import dotenv from'dotenv';
import path from'path';
import userRoutes from './routes/user.route.js';
import homeRoutes from './routes/home.route.js';
import blogRoutes from './routes/blog.route.js';
import connectMongoDb from './config/mongodb.config.js';
import { isAuthenticated } from './middlewares/authentication.middleware.js';
import cookieParser from 'cookie-parser';

dotenv.config();


const app = express();
const PORT  = process.env.PORT || 3000;

connectMongoDb(process.env.MONGO_URI);

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static(path.resolve("public")));

app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(isAuthenticated('token'));

app.use('/', homeRoutes);

app.use('/user', userRoutes);

app.use('/blog', blogRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});