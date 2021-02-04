const express = require('express');
const bodyParser = require('body-parser');
const User = require('./Model/user');
const bcrypt = require('bcryptjs')
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.json());

// For register User
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

// For login User
router.post("/login", async (req, res) => {
    const user = await User.findOne({ username: req.body.username});
    if (!user)
        return res.send("User Not Found..!!");
    else{
        const isValid = await bcrypt.compare(req.body.password,user.password);
        if (!isValid)
            return res.send("Invalid Password Try Again...")
        else{
            res.send("User Founded");
        }
    } 
});


module.exports = router;