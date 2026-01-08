import express from 'express';
import dotenv from'dotenv';
import path from'path';
import userRoutes from './routes/user.route.js';
import connectMongoDb from './config/mongodb.config.js';

dotenv.config();

const app = express();
const PORT  = process.env.PORT || 3000;

connectMongoDb(process.env.MONGO_URI);

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));


app.get('/', (req, res) => {res.render('home');});

app.use('/user', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});