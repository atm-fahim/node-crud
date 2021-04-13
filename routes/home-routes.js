const express = require("express");

const sessionCheck = (req, res, next) => {
  if (req.session.user_id === null) {
    // res.send("5");
    //console.log(req.session.user_id);
    res.redirect("/");
  } else {
    // req.session.name = "GeeksforGeeks";
    // var name = req.session.name;
    // return res.send(name);
    //console.log(req.session.user_id);
    //const userID = req.session;
    //Object.defineProperty(this, "id", { value: req.sessionID });
    // req.session.destroy();
    //res.clearCookie("connect.sid");
    //res.send(`'${userID}'`);
    // res.redirect("/home");
    next();
  }
};

const {
  indexView,
  iconsView,
  merchantView,
  login,
  save_merchant,
  merchant_edit,
} = require("../controllers/homeController");
const router = express.Router();
console.log(__dirname);
// router.get("/", sessionCheck, indexView);
router.get("/icons", sessionCheck, iconsView);
router.get("/home", sessionCheck, indexView);
router.get("/merchant", sessionCheck, merchantView);
router.post("/save-merchant", save_merchant);
router.get("/edit-merchant/:id/", merchant_edit);

router.post("/login", login);
module.exports = {
  routes: router,
};
