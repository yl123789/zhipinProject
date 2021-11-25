//匹配路由，根据路由来实现业务
const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


module.exports = router;
