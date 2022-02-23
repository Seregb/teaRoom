const express = require('express');
const app = express();

const sha = require('sha256');
const path = require('path');
const hbs = require('hbs');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
require('dotenv').config();

app.set('view engine', 'hbs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
hbs.registerPartials(path.join('views', 'partials'));

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  console.log('zavelos');
});
