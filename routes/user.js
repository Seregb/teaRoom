const router = require('express').Router();
const { User, Tea, Comment } = require('../db/models');
const sha256 = require('sha256');

router.get('/', async (req, res) => {
  res.render('index');
});

module.exports = router;
