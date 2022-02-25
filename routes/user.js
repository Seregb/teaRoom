const router = require('express').Router();
const { User, Tea, Comment } = require('../db/models');
const sha256 = require('sha256');
const { checkUser, deepCheckUser } = require('../middleware/allmidleware');

//РЕГИСТРАЦИЯ
router.get('/signup', async (req, res) => {
  res.render('signup');
});

router.post('/signup', async (req, res) => {
  const { name, email } = req.body;
  console.log(req.body);
  const password = sha256(req.body.password);
  const doesItExist = await User.findOne({ where: { email } });
  console.log(doesItExist);
  if (!doesItExist) {
    const user = await User.create({ name, email, password, isAdmin: false });
    req.session.userName = user.name;
    req.session.userEmail = user.email;
    req.session.userId = user.id;
    req.session.isAdmin = user.isAdmin;
    return res.redirect(`/users/profile/${user.id}`);
  }
  return res.redirect('/users/signup');
});

router.get('/signin', (req, res) => {
  res.render('signin');
});

router.post('/signin', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } }); // ищем в бд юзера по почте
  if (!user) {
    return res.redirect('/users/signup');
  }
  if (user.password === sha256(req.body.password)) {
    req.session.userName = user.name;
    req.session.userEmail = user.email;
    req.session.userId = user.id;
    res.redirect(`/users/profile/${user.id}`);
  } else {
    return res.redirect('/users/signin');
  }
});

router.get('/profile/:id', async (req, res) => {
  const comment = await Comment.findAll({
    include: [{ model: User }, { model: Tea }], order: [['updatedAt', 'DESC']], raw: true,
  });
  console.log(comment);
  const user = await User.findByPk(req.params.id);

  //const isAdmin = user.isAdmin === true;
  //res.render('profile', { user, admin: isAdmin });
//});

  const isAdmin = (user.isAdmin === true)
  res.render('profile', { comment, user, admin: isAdmin })
})

//ВЫХОД
router.get('/logout', (req, res) => {
  // при logout сессия удаляется из папки sessions
  req.session.destroy();
  res.clearCookie('userCookie');
  res.redirect('/');
});


module.exports = router;
