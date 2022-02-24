const express = require('express');
const sha = require('sha256');
const path = require('path');
const hbs = require('hbs');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
require('dotenv').config();

const indexRouter = require('./routes/index.js');
// const userRouter = require('./routes/user.js');
const teaRouter = require('./routes/tea.js');

const app = express();

app.set('view engine', 'hbs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
hbs.registerPartials(path.join('views', 'partials'));

app.use('/tea', teaRouter);
// app.use('/users', userRouter);
app.use('/', indexRouter);

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  console.log('zavelos');
});
