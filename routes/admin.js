const router = require('express').Router();

const multer = require('multer');
const { Tea, Comment, User } = require('../db/models');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './public/uploads');
  },
  filename(req, file, cb) {
    // console.log(file);
    const uniqueSuffix = file.originalname;
    cb(null, `${uniqueSuffix}`);
  },
});
const upload = multer({ storage });

// router.get('/', async (req, res) => {
//   res.render('admin');
// });

router.get('/', async (req, res) => {
  try {
    const posts = await Tea.findAll();
    // const preparedPosts = posts.map((el) => ({
    //   id: el.id,
    //   img: el.img,
    //   description: el.description,
    //   place: el.place,
    //   tags: el.Tags.map((tag) => ({
    //     name: tag.name,
    //   })),
    // }));
    // console.log(posts);
    // res.json(posts);
    res.render('admin', { posts });
  } catch (error) {
    res.sendStatus(500);
  }
});

router.post('/', upload.single('img'), async (req, res) => {
  console.log(req.body);
  try {
    const { name, description, place, comment } = req.body;
    // console.log(req);
    const addTea = await Tea.create({
      name,
      description,
      place,
      comment,
      img: `uploads/${req.file.originalname}`,
    });
    res.json(addTea);
    console.log(addTea);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// /admin
router.delete('/tea/:id', async (req, res) => {
  // console.log(req.params.id);
  try {
    await Tea.destroy({ where: { id: Number(req.params.id) } });
    // await Tea.update(
    //   { isDeleted: true },
    //   { where: { id: Number(req.params.id) } }
    // );
    res.sendStatus(200);
    // res.json({ a: 'a' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
