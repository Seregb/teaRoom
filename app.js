const express = require('express');
const logger = require('morgan');
const sha = require('sha256');
const path = require('path');
const hbs = require('hbs');
require('dotenv').config();
const indexRouter = require('./routes/index.js');
const userRouter = require('./routes/user.js');
const app = express();
const {addLocals} = require('./middleware/allmidleware')

// https://www.npmjs.com/package/cookie-parser
// скачиваем либу для работы с куки
const cookieParser = require('cookie-parser');

// https://www.npmjs.com/package/express-session
// создает сессии на экпрессе
const session = require('express-session');

// https://www.npmjs.com/package/session-file-store
// используется для хранения наших сессий
const FileStore = require('session-file-store')(session);

app.set('view engine', 'hbs');




// Подключаем middleware morgan с режимом логирования "dev", чтобы для каждого HTTP-запроса на сервер в консоль выводилась информация об этом запросе.
app.use(logger('dev'));
// Подключаем middleware, которое сообщает epxress, что в папке "ПапкаПроекта/public" будут находится статические файлы, т.е. файлы доступные для скачивания из других приложений.
app.use(express.static(path.join(__dirname, 'public')));
// Подключаем middleware, которое позволяет читать содержимое body из HTTP-запросов типа POST, PUT и DELETE.
app.use(express.urlencoded({ extended: true }));
// Подключаем middleware, которое позволяет читать переменные JavaScript, сохранённые в формате JSON в body HTTP-запроса.
app.use(express.json());

hbs.registerPartials(path.join('views', 'partials'));



// мидл вара
app.use(session({
  secret: 'apojrglkdzfng;sakg', // строка для шифрования сессии
  resave: false, // не пересохраняем сессию если не было изменений
  saveUninitialized: false, // не сохраняем сессию если она пустая
  cookie: { secure: false }, // не HTTPS
  name: 'userCookie', // имя сессионной куки
  store: new FileStore(), // хранилище для куков - папка с файлами
}));

app.use(addLocals)

app.use('/users', userRouter);
app.use('/', indexRouter);
app.use(cookieParser());


// Если HTTP-запрос дошёл до этой строчки, значит ни один из ранее встречаемых рутов не ответил на запрос. Это значит, что искомого раздела просто нет на сайте. Для таких ситуаций используется код ошибки 404. Создаём небольшое middleware, которое генерирует соответствующую ошибку.
app.use((req, res, next) => {
  const error = createError(404, 'Запрашиваемой страницы не существует на сервере.');
  next(error);
});

// Отлавливаем HTTP-запрос с ошибкой и отправляем на него ответ.
app.use(function (err, req, res, next) {
  // Получаем текущий ражим работы приложения.
  const appMode = req.app.get('env');
  // Создаём объект, в котором будет храниться ошибка.
  let error;

  // Если мы находимся в режиме разработки, то отправим в ответе настоящую ошибку. В противно случае отправим пустой объект.
  if (appMode === 'development') {
    error = err;
  } else {
    error = {};
  }

  // Записываем информацию об ошибке и сам объект ошибки в специальные переменные, доступные на сервере глобально, но только в рамках одного HTTP-запроса.
  res.locals.message = err.message;
  res.locals.error = error;

  // Задаём в будущем ответе статус ошибки. Берём его из объекта ошибки, если он там есть. В противно случае записываем универсальный стату ошибки на сервере - 500.
  res.status(err.status || 500);
  // Формируем HTML-текст из шаблона "error.hbs" и отправляем его на клиент в качестве ответа.
  res.render('error');
});

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  console.log('zavelos');
});
