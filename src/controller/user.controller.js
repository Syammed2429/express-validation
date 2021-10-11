const express = require('express');
const router = express.Router();

const User = require('../models/user.model');

const {body, validationResult} = require('express-validator');

router.get("", async (req, res) => {
    const users = await User.find().lean().exec();
    res.status(200).send(users)
})

router.post("",
body("first_name").notEmpty().withMessage("Please enter the first name and it's required"),
body("last_name").notEmpty().withMessage("Please enter the last name and it's required"),
body("email").isEmail().withMessage("Please enter a valid email address"),
body("pincode").isLength({min : 6, max : 6}).withMessage("Please enter exactly 6 numbers"),
body("age").isLength({min : 1, max : 100}).withMessage("Please enter the age between 1 and 100 "),
body("gender").custom(value => {
    if(value != "Male" && value != "male" && value != "Female" && value != "female" && value != "others"  && value != "Others") {
        console.log('value:', value)
        throw new Error("Please enter a valid gender value")

    }
    return true

}),
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(401).send(errors.array())
    }
    const user = await User.create(req.body);
    res.send(user)
}
);

module.exports = router;