const User = require('../models/Signup');
const {
    attachCookiesToResponse,
    createTokenUser,
} = require("../utils");


const register = async (req, res) => {
    try {
        const user = await User.create(req.body)
        const tokenUser = createTokenUser(user);
        const Token = attachCookiesToResponse({ res, user: tokenUser });
        res.status(200).json({ user, auth: Token, message: "user register" })
    } catch (error) {
        console.log(error);
    }
}

const login = async (req, res) => {
    const { email, password } = req.body
    if (password && email) {
        const user = await User.findOne(req.body).select('-password')
        const tokenUser = createTokenUser(user);
        const Token = attachCookiesToResponse({ res, user: tokenUser });
        res.status(200).json({ user, auth: Token, message: "user Login" })
    }
    else {
        res.send({ message: "user not found" }) 
    } 
}

const logout =(req, res) => {
    return res
    .clearCookie("tokens")
    .status(200)
    .json({ message: "Successfully logged out" });
    // res.cookie("token", "none", {
    //     httpOnly: true,
    //     expires: new Date(Date.now()),
    // });
    // res.status(200).json({ msg: "user successfully logged out!" });
};

module.exports = {
    register,
    login,
    logout
}