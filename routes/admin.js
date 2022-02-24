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
    cb(null, `${uniqueSuffix}`);
  },
});
const upload = multer({ storage });

router.get('/', async (req, res) => {
  res.render('admin');
});

router.post('/', upload.single('img'), async (req, res) => {
  try {
    const { name, description, place } = req.body;
    // console.log(req);
    const addTea = await Tea.create({
      name,
      description,
      place,
      img: `uploads/${req.file.originalname}`,
    });
    res.json(addTea);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
