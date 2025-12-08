const express = require("express");

const app = express();

const api = express();

const cors = require("cors");

const cookieParser = require("cookie-parser");

app.use(cors(
{
    origin: [ "http://localhost:3000" ],
    credentials: true,
}));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

const userRoutes = require("./api/routes/userRoutes");

const errorHandler = require("./api/middlewares/errorHandler");

const authRoutes = require("./api/routes/authRoutes");

const termekRoutes = require("./api/routes/termekRoutes")

const kategoriaRoutes = require("./api/routes/kategoriaRoutes")

const postPicRoutes = require("./api/routes/postPicRoutes")

const kosartetelRoutes = require("./api/routes/kosartetelRoutes")

const cartRoutes = require("./api/routes/cartRoutes");

app.use("/api", api);

api.use("/users", userRoutes);

api.use("/auth", authRoutes);

api.use("/termekek", termekRoutes);

api.use("/kategoriak", kategoriaRoutes);

api.use("/picupload", postPicRoutes);

api.use("/kosartetelek", kosartetelRoutes);

api.use("/kosar", cartRoutes);

api.use(errorHandler.notFound);

app.use(errorHandler.showError);

app.use(errorHandler.notFound);

module.exports = app;