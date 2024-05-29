const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const MongoDbStore = require("connect-mongodb-session")(session);
require("dotenv").config();

const dbConnect = require("./db/dbConnect");
dbConnect();

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const productRouter = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const cashRegisterRouter = require("./routes/cashRegisterRoutes");

const app = express();

const store = new MongoDbStore({
  uri: process.env.MONGO_URL,
  collection: "cashRegister",
});

//middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: true,
    saveUninitialized: true,
    store: store,
  })
);

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth", authRoutes);
app.use("/stock", productRouter);
app.use("/cashRegister", cashRegisterRouter);

module.exports = app;
