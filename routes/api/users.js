const express = require("express"); 
const router = express.Router(); 

// @route GET /api/users/test
// @decription Test users routes
// @access Public 

router.get("/test", (req, res)=> {
  res.json({
    msg: 'user are here babe !'
  })
})


module.exports = router; 