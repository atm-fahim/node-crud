const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const userRoutes = require("./routes/User-routes");
const homeRoutes = require("./routes/home-routes");
const jwt = require("jsonwebtoken");
//const bodyParser = require("body-parser");

const app = express();

app.use(
  express.urlencoded({
    extended: false,
  })
);

// app.use(cookieParser());
const port = 3000;
const user_id = null;
app.use(
  session({
    secret: "fahimtest",
    resave: true,
    saveUninitialized: true,
    //expires: 60 * 60 * 1000,
    store: user_id,
    //cookie: { maxAge: 60 * 60 * 1000 },
    cookie: { secure: true },
  })
);
app.get("/logout", function (req, res) {
  req.session.destroy(function () {
    console.log("user logged out.");
  });
  res.redirect("/login");
});

app.set("view engine", "ejs");

const staticpath = path.join(__dirname, "./public");
// console.log(hostname);
app.use(userRoutes.routes);
app.use(express.static(staticpath));
app.use(expressLayouts);
console.log(staticpath);
//console.log(path.join(__dirname, "./public"));

//app.use("/public/", express.static("public"));
app.use(homeRoutes.routes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
