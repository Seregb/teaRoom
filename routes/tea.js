const router = require('express').Router();
const { Tea, Comment, User } = require('../db/models');

router.route('/:id').get(async (req, res) => {
  const teaId = req.params.id;
  // console.log(teaId);
  try {
    const { name, description, img } = await Tea.findOne({
      where: { id: teaId },
    });
    // const comment = await Comment.findAll({ where: { id: teaId } });
    // const user = await User.findOne({ where: { id: comment[0].user_id } });
    return res.render('tea', {
      name,
      description,
      img,
      // userName: user.name,
      // text: comment[0].text,
    });
  } catch (err) {
    // console.log(err);
  }
  // console.log(tea);
});

module.exports = router;
