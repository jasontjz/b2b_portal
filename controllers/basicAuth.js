function authUser(req, res, next) {
  if (req.session.role === "admin" || req.session.role === "customer") {
    next();
  } else {
    res.render("../views/signup.ejs");
  }
}

function authAdmin(req, res, next) {
  if (req.session.role === "admin") {
    next();
  } else {
    res.redirect("/?success=true&action=forbidden");
  }
}

module.exports = {
  authUser,
  authAdmin,
};
