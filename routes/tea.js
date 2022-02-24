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

router
  .route('/:id')
  .get(async (req, res) => {
    const teaId = req.params.id;
    // console.log(upload);
    try {
      const {
        id, name, description, img, place,
      } = await Tea.findOne({ where: { id: teaId } });
      const comment = await Comment.findAll({ where: { id: teaId } });
      const user = await User.findOne({ where: { id: comment[0].user_id } });
      return res.render('tea', {
        id, name, description, img,
      });
    } catch (err) {
      // console.log(err);
    }
  })
  .post(async (req, res) => {
    const user = await User.findOne({ where: { id: 1 } });
    const userComm = await Comment.create({ user_id: 1, tea_id: 1, text: req.body.comment });
    res.sendStatus(200);
  });

module.exports = router;
