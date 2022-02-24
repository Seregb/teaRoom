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
    const teaId = req.params.id;
    try {
      const { id, name, description, img, place } = await Tea.findOne({ where: { id: teaId } });

      const comment = await Comment.findAll({ where: { tea_id: teaId }, order: [['updatedAt', 'DESC']] });
      const user = await User.findOne({ where: { id: comment[0].user_id } });
      const time = Math.floor(timer(comment[0].updatedAt) / 100000);
      const timeAnswer = time === 0 ? `было только что` : `${time} мин. назад`;
      
      return res.render('tea', {
        comment, id, name, description, img, timeAnswer, time,
      });
    } catch (err) {
      // console.log(err);
    }
  })
  .post(async (req, res) => {
    const user = await User.findOne({ where: { id: 1 } });
    const userComm = await Comment.create({ user_id: 1, tea_id: 1, text: req.body.comment });
    res.json(userComm);
  });

module.exports = router;
