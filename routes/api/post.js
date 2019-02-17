const express = require("express");
const router = express.Router();

// @route GET /api/posts/test
// @decription Test Post routes
// @access Public 

router.get("/test", (req, res) => {
  res.json({
    msg: 'posts are here babe !'
  })
})


module.exports = router;