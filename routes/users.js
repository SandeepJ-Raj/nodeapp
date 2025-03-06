const express = require('express');
const router = express.Router();

const {registerUser, loginUser, currentUser} = require('../controllers/usersController');

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/current").get(currentUser);

module.exports = router;