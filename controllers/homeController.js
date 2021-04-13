const db = require("../config/database");
const bcrypt = require("bcrypt");
const Users = [];

const indexView = (req, res) => {
  res.render("home");
};
const iconsView = (req, res) => {
  res.render("icons");
};

//merchant
const merchantView = (req, res) => {
  db.query("SELECT * FROM merchant", (err, merchant) => {
    if (err) {
      res.json(err);
    }
    res.render("merchant", {
      data: merchant,
    });
  });
};
//create merchant
const save_merchant = async (req, res) => {
  const merchent_name = req.body.marchant_name;
  const email = req.body.email;
  // console.log(merchent_name);
  const sql = `INSERT INTO merchant (username, email) VALUES ('${merchent_name}', '${email}')`;
  db.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log("Successfuly inserted");
    return res.redirect("/merchant");
  });
  db.connect.end();
};
//merchant edit
const merchant_edit = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM merchant WHERE id = ?", [id], (err, rows) => {
    res.render("merchant_edit", {
      data: rows[0],
    });
  });
};
//login user;
const login = async (req, res) => {
  //const sess = req.session;
  //const hash = await bcrypt.hash(`'${req.body.password}'`, 10);
  const email = req.body.email;
  const password = req.body.password;
  var hash = await bcrypt.hash(password, 10);
  const bcryptPassword = bcrypt.compare(password, hash);
  if (email && bcryptPassword) {
    //const users = db.users.find(users.email === email);
    //console.log(users);
    // if (users) throw new console.error("this email exist");

    const user = db.query(
      "SELECT * FROM users",
      function (err, result, fields) {
        if (err) throw err;
        ///Users.push(user);
        //console.log(result[0].id);
        req.session.loggedin = true;
        req.session.user_id = result[0].id;
        // const usr={
        //   id=result[0].id,
        // }
        //user.push(usr);
        // console.log(req.session.id);
        return res.redirect("/home");
      }
    );

    //console.log(req.session.user_id);
    // console.log(user);
    // db.query(
    //   "SELECT password,email FROM users WHERE email = ? AND password = ?",
    //   [email, bcryptPassword],
    //   (err, result, fields) => {
    //     console.log(result);
    //     res.send("Successful Login");
    //     // res.redirect("/home");
    //   }
    // );
    // db.query(
    //   "SELECT password FROM users WHERE email = ? AND password = ?",
    //   [email, bcryptPassword],
    //   (error, results, fields) => {
    //     if (results.length > 0) {
    //       res.send("Successful");
    //     } else {
    //       res.send("Incorrect Email and/or Password!");
    //     }
    //     res.end();
    //     connection.end();
    //   }
    // );
    //connection.end();
  } else {
    res.send("Please enter Username and Password!");
    res.end();
  }
  // bcrypt.compare(`'${req.body.password}'`, hash, function (err, res) {
  //   if (res) {
  //     console.log("Passwords  match");
  //   } else {
  //     console.log("Passwords don't match");
  //     // Passwords don't match
  //   }
  // });

  // const hash = await bcrypt.hash(`'${req.body.password}'`, 10);
  // const sql = `INSERT INTO users (name, email, password) VALUES ('fahim', '${req.body.email}', '${hash}')`;
  // db.query(sql, function (err, result) {
  //   if (err) throw err;
  //   console.log("1 record inserted");
  //   connection.end();
  // });
  // // console.log("email address:", req.body.email);
};

const createUser = async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  var hash = await bcrypt.hash(password, 10);
  const bcryptPassword = bcrypt.compare(password, hash);
  if (email && bcryptPassword) {
    const sql = `INSERT INTO users (name, email, password) VALUES ('${username}', '${email}', '${hash}')`;
    db.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Successfuly inserted");
      connection.end();
    });
  } else {
    res.send("Please enter Username and Password!");
    res.end();
  }

  // res.render("home");
};

module.exports = {
  indexView,
  iconsView,
  login,
  createUser,
  merchantView,
  save_merchant,
  merchant_edit,
};
