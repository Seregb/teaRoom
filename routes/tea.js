const router = require('express').Router();
const { Tea, Comment, User } = require('../db/models');


router
  .route('/:id')
  .get(async (req, res) => {
    const teaId = req.params.id;
    // console.log(teaId);
    try {
      const { name, description, img } = await Tea.findOne({ where: { id: teaId } });
      const { id, user_id, tea_id } = await Comment.findOne({ where: {} })
      // console.log(tea);
      return res.render('tea', { name, description, img });
    } catch (err) {
      console.log(err);
    }
    // console.log(tea);
  });

module.exports = router;
