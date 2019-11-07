const router = require('express').Router(),
  { postRegister, postLogin } = require('../controllers/user');

router.route('/register').get(postRegister);
router.route('/login').get(postLogin);

module.exports = router;
