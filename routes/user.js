const router = require('express').Router();
const { User, Tea, Comment } = require('../db/models');
const sha256 = require('sha256');
const {checkUser, deepCheckUser} = require('../middleware/allmidleware')

//РЕГИСТРАЦИЯ
router.get('/signup', async (req, res) => {
  res.render('signup');
});

router.post('/signup', async (req, res) => {
  const { name, email } = req.body;
  console.log(name);
  const password = sha256(req.body.password); // шифруем пароль
  const doesItExist = await User.findOne({where: {email}})
  if (!doesItExist){
    const user = await User.create({ name, email, password, isAdmin: false}); // создаем нового юзера
    req.session.userName = user.name; // записываем в сессию имя юзера, чтобы потмо его проверять (см стр 12 в allMiddleware.js)
    req.session.userEmail = user.email;
    req.session.userId = user.id;
    req.session.isAdmin = user.isAdmin
    return res.redirect(`/users/profile/${user.id}`); // редирект на профиль нового юзера
  } else res.redirect('/users/signup')
  });


//ВХОД
router.get('/signin', (req, res) => {
  res.render('signin');
});

router.post('/signin', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } }); // ищем в бд юзера по почте
  if (!user) {
    return res.redirect('/users/signup');
  }
  if (user.password === sha256(req.body.password)) { // если шифрованный пароль из бд совпадает с зашифрованным тем что ввел юзер
    req.session.userName = user.name; // записываем в сессию имя юзера, чтобы потмо его проверять (см стр 12 в allMiddleware.js)
    req.session.userEmail = user.email;
    req.session.userId = user.id;
    res.redirect(`/users/profile/${user.id}`);
  } else {
      return res.redirect('/users/signin');
  }
});


//ЛИЧНЫЙ КАБИНЕТ

router.get('/profile/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id);
  res.render('profile', {user})
})

// //ВЫХОД
// router.get('/logout', (req, res) => {
//   // при logout сессия удаляется из папки sessions
// req.session.destroy();
// res.clearCookie('userCookie');
// res.redirect('/');
// })



module.exports = router;
