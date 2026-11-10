import express from 'express';
import serverless from 'serverless-http';
import path from 'path';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const router = express.Router();

// Bosh sahifa - alohida index.html ni o'qish
router.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'dist', 'index.html'));
});

// Home sahifasi - alohida home.html ni o'qish
router.get('/home', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'dist', 'home.html'));
});

// Login tekshiruvi
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
