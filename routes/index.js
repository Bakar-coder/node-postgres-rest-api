const router = require('express').Router(),
  { getIndex } = require('../controllers');

router.route('/').get(getIndex);

module.exports = router;
