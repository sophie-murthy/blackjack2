import './config.mjs';
import './db.mjs';
import express from 'express'
import path from 'path';
import url from 'url';

const app = express()

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'hbs');


app.get('/', (req, res) => {
    res.render('game', {});
});



app.listen(process.env.PORT || 3000, () => {  
    console.log('Server is running on port 3000');
});