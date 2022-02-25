const checkUser = (req, res, next) => {
  if (req.session.userName) {
    // проверяем есть ли в сессии userName (см стр 18 и 33 в users.js router)
    next();
  } else {
    res.redirect('/users/signin'); // если в сессии нет userName тогда редирект
  }
};

const addLocals = (req, res, next) => {
  res.locals.userId = req.session?.userId;
  res.locals.userName = req.session?.userName;
  next();
};

const deepCheckUser = (req, res, next) => {
  console.log('deepCheckUser');
  console.log(req.params.id, req.session.userId);
  if (Number(req.session.userId) === Number(req.params.id)) {
    // сравниваем id юзера и id профиля на который он хочет попасть
    next();
  } else {
    res.redirect(`/users/profile/${req.session.userId}`); // редиректим юзера всегда на свой профиль при попытке перейти на чужой
  }
};

const checkAdmin = () => {
  if (req.session.isAdmin === true) {
    next();
  }

}

module.exports = { checkUser, deepCheckUser, addLocals };
