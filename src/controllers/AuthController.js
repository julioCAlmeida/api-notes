const passport = require("passport");

const CLIENT_URL = "localhost:3333/";

class AuthController {
    loginSuccess(req, res) {
        if(req.user) {
            res.status(200).json({
                sucess: true,
                message: "successfull",
                user: req.user
            })
        }
    }

    loginFailed(req, res) {
        res.status(401).json({
            success: false,
            message: "failure"
        })
    }

    logout(req, res) {
        req.logout()
        res.redirect(CLIENT_URL);
    }
}

module.exports = AuthController;