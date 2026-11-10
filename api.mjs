import express from 'express';
import serverless from 'serverless-http';
import path from 'path';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 3000;

// Formadan ma'lumotlarni req.body orqali olish uchun sozlama
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Netlify uchun router prefix (mahalliy va server muhitini bir xil qilish uchun)
const router = express.Router();

// Bosh sahifa - dist/index.html ni o'qish
router.get('/', (req, res) => {
    res.sendFile(path.resolve('dist', 'index.html'));
});

// Home sahifasi - dist/home.html ni o'qish
router.get('/home', (req, res) => {
    res.sendFile(path.resolve('dist', 'home.html'));
});

// Login POST so'rovi (Tekshirish)
router.post('/login', (req, res) => {
    const { login, password } = req.body;

    if (login === 'admin' && password === 'admin123') {
        res.redirect('/.netlify/functions/api/home');
    } else {
        res.send('Sizga ruxsat berilmagan! Login yoki parol xato.');
    }
});

// Routerlarni ulash
app.use('/.netlify/functions/api', router);
// Mahalliy tekshirish oson bo'lishi uchun asosiy yo'lga ham yo'naltiramiz
app.use('/', router);

// Mahalliy kompyuterda ishga tushirish uchun portni eshitish
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server muvaffaqiyatli ishga tushdi: http://localhost:${PORT}`);
    });
}

// Netlify Serverless muhiti uchun eksport
export const handler = serverless(app);