const { Router } = require("express");
const AuthController = require("../controllers/AuthController");
const passport = require("passport");

const CLIENT_URL = "localhost:3333/";

const authRoutes = Router();
const authController = new AuthController();

//types login
authRoutes.get("/login/success", authController.loginSuccess);

authRoutes.get("/login/failed", authController.loginFailed);

authRoutes.get("/logout", authController.logout);

//login google
authRoutes.get("/google", passport.authenticate("google", { scope: ["profile"]}));

authRoutes.get("/google/callback", passport.authenticate("google", {
    sucessRedirect: CLIENT_URL,
    failureRedirect: "/login/failed"
}));

//login facebok
authRoutes.get("/facebook", passport.authenticate("facebook", { scope: ["profile"] }));

authRoutes.get("/facebook/callback", passport.authenticate("facebook", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

module.exports = authRoutes;