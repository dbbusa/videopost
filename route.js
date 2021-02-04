const express = require('express');
const bodyParser = require('body-parser');
const User = require('./Model/user');
const bcrypt = require('bcryptjs')
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.json());

// For Users
router.post("/register", async (req, res) => {
    var saltkey = await bcrypt.genSalt(10);
    var hasedPass = await bcrypt.hash(req.body.password, saltkey);
    const user = new User({
        username: req.body.username,
        password: hasedPass

    });
    await user.save();
    res.send("Registerd Successfully");
});


module.exports = router;