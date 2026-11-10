import express from 'express';
import serverless from 'serverless-http';
import path from 'path';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const router = express.Router();

// Bosh sahifa
router.get('/', (req, res) => {
    res.sendFile(path.resolve('dist', 'index.html'));
});

// Home sahifasi
router.get('/home', (req, res) => {
    res.sendFile(path.resolve('dist', 'home.html'));
});

// Login POST tekshiruvi
router.post('/login', (req, res) => {
    const { login, password } = req.body;

    if (login === 'admin' && password === 'admin123') {
        // Netlify muhitida home sahifasiga to'g'ri yo'naltirish
        res.redirect('/.netlify/functions/api/home');
    } else {
        res.send('Sizga ruxsat berilmagan! Login yoki parol xato.');
    }
});

// Netlify uchun router prefixini ulash
app.use('/.netlify/functions/api', router);
app.use('/', router);

export const handler = serverless(app);
