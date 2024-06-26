const User = require("../Models/UserModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userVerification = (req, res) => {
    const token = req.cookies.token
    if (!token) {
        return res.json({ status: false })
    }
    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
        if (err) {
            return res.json({ status: false })
        } else {
            const user = await User.findById(data.id)
            if (user) return res.json({ status: true, user: user.username })
            else return res.json({ status: false })
        }
    })
}

module.exports.authorization = (req, res, next) => {
    const token = req.cookies.token;
    console.log("token", token)
    if (!token) {
        return res.sendStatus(403);
    }
    try {
        const data = jwt.verify(token, process.env.TOKEN_KEY);
        req.userId = data.id;
        req.userRole = data.role;
        return next();
    } catch {
        return res.sendStatus(403);
    }
};