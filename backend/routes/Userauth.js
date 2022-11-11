const express = require("express");
const router = express.Router();
const {verify}=require('../middleware/auth')

const { register, login, logout } = require('../controllers/UserAuth')

router.post('/api/register',register)
router.post('/api/login',login)
router.get("/api/logout",logout)



module.exports = router;