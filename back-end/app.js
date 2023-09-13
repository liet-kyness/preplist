"use strict";

const express = require("express");
const cors = require("cors");
const { authenticateJWT } = require("./middleware/auth");
const userRoutes = require("./routes/users");
const recipeRoutes = require("./routes/recipes");
const authRoutes = require("./routes/auth")
const { NotFoundError } = require("./expressError");
const morgan = require("morgan");
const ingredientRoutes = require("./routes/ingredients");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(authenticateJWT);

app.use("/users", userRoutes);
app.use("/recipes", recipeRoutes);
app.use("/auth", authRoutes);
app.use("/ingredients", ingredientRoutes);

app.use(function(req, res, next) {
    return next(new NotFoundError());
});

app.use(function (err, req, res, next) {
    if (process.env.NODE_ENV !== "test") console.error(err.stack);
    const status = err.status || 500;
    const message = err.message;

    return res.status(status).json({
        error: { message, status },
    });
});

module.exports = app;