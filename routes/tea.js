const router = require('express').Router();
const multer = require('multer');
const { Tea, Comment, User } = require('../db/models');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './public/uploads');
  },
  filename(req, file, cb) {
    console.log(file);
    const uniqueSuffix = file.originalname;
    cb(null, `${file.fieldname}-${uniqueSuffix}`);
  },
});
const upload = multer({ storage });

function timer(timeCom) {
  return new Date() - timeCom;
}

router
  .route('/:id')
  .get(async (req, res) => {
    let time;
    let timeAnswer;
    const teaId = req.params.id;
    try {
      const {
        id, name, description, img, place,
      } = await Tea.findOne({ where: { id: teaId } });
      const comment = await Comment.findAll({
        include: [{ model: User }, { model: Tea }], where: { tea_id: teaId }, order: [['updatedAt', 'DESC']], raw: true,
      });
      console.log(comment);
      if (comment.length > 0) {
        time = Math.floor(timer(comment[0].updatedAt) / 100000);
        timeAnswer = time === 0 ? 'было только что' : `${time} мин. назад`;
      }
      const { userName } = req.session;

      return res.render('tea', {
        comment, id, name, description, img, timeAnswer, time, place, userName,
      });
    } catch (err) {
      console.log(err);
    }
  })
  .post(async (req, res) => {
    const ourUserId = req.session.userId;
    const ourteaId = req.params.id;
    const user = await User.findOne({ where: { id: ourUserId } });
    const userComm = await Comment.create({
      user_id: ourUserId, tea_id: ourteaId, text: req.body.comment,
    });
    res.json({ userComm, user });
  });

module.exports = router;
