
require("express-async-errors");
require("./authenticates/passport")

const cors = require("cors");
const passport = require("passport");
const cookieSession = require('cookie-session');
const migrationsRun = require("./database/sqlite/migrations");
const AppError = require("./utils/AppError");
const express = require("express");
const routes = require("./routes");

const app = express();
migrationsRun();

app.use(express.json());
app.use(routes);

app.use(cookieSession({
    name: 'session',
    keys: ["secretCookies"],

    maxAge: 24 * 60 * 60 * 1000
  }));

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
    origin: "http://localhost:3333",
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
}));

app.use((error, req, res, next) => {
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            status: "error",
            message: error.message
        });
    }

    console.log(error);

    return res.status(500).json({
        status: "error",
        message: "Internal server error"
    });
});

const PORT = 3333;
app.listen(PORT, () => console.log(`Server is running on Port: ${PORT}`));
