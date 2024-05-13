import './config.mjs';
import './db.mjs';
import express from 'express'
import path from 'path';
import url from 'url';

const app = express()

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'public')));