import express from 'express';
import serverless from 'serverless-http';
import path from 'path';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const router = express.Router();

// Bosh sahifa - dist/index.html ni yuklash
router.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'dist', 'index.html'));
});

// Home sahifasi - dist/home.html ni yuklash
router.get('/home', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'dist', 'home.html'));
});

// Login POST tekshiruvi
router.post('/login', (req, res) => {
    const { login, password } = req.body;

    if (login === 'admin' && password === 'admin123') {
        res.redirect('/.netlify/functions/api/home');
    } else {
        res.send('Sizga ruxsat berilmagan! Login yoki parol xato.');
    }
});

app.use('/.netlify/functions/api', router);
app.use('/', router);

export const handler = serverless(app);
