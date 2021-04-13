const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const homeRoutes = require("./routes/home-routes");
const userRoutes = require("./routes/User-routes");
var db = require("./config/database");
const app = express();
const port = 3000;

app.use(expressLayouts);
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(homeRoutes.routes);
app.use(userRoutes.routes);
// app.listen(3000, () =>
//   console.log("App is listening on url http://localhost:3000")
// );
