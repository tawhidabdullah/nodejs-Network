const express = require("express"); 
const router = express.Router(); 

// @route GET /api/profile/test
// @decription Test profile routes
// @access Public 

router.get("/test", (req, res)=> {
  res.json({
    msg: 'profile are here babe !'
  })
})


module.exports = router; 