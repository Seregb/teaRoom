const express = require('express');
const logger = require('morgan');
const sha = require('sha256');
const path = require('path');
const hbs = require('hbs');
require('dotenv').config();

const indexRouter = require('./routes/index.js');
const teaRouter = require('./routes/tea.js');
const userRouter = require('./routes/user.js');
const adminRouter = require('./routes/admin');
const { addLocals } = require('./middleware/allmidleware');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const app = express();

app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(process.env.PWD, 'public')));
hbs.registerPartials(path.join('views', 'partials'));
app.use('/tea', teaRouter);

app.use(
  session({
    secret: 'apojrglkdzfng;sakg', // строка для шифрования сессии
    resave: false, // не пересохраняем сессию если не было изменений
    saveUninitialized: false, // не сохраняем сессию если она пустая
    cookie: { secure: false }, // не HTTPS
    name: 'userCookie', // имя сессионной куки
    store: new FileStore(), // хранилище для куков - папка с файлами
  })
);

app.use(addLocals);

app.use('/users', userRouter);
app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/tea', teaRouter);
app.use(cookieParser());

// app.use((req, res, next) => {
//   const error = createError(
//     404,
//     'Запрашиваемой страницы не существует на сервере.'
//   );
//   next(error);
// });

// app.use((err, req, res, next) => {
//   const appMode = req.app.get('env');
//   let error;
//   if (appMode === 'development') {
//     error = err;
//   } else {
//     error = {};
//   }
//   res.locals.message = err.message;
//   res.locals.error = error;
//   res.status(err.status || 500);
//   // res.render('error');
// });

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  console.log('zavelos');
});
