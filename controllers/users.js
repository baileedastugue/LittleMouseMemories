// // // login handler
// // router.post("/login", (req, res, next) => {
// //     passport.authenticate('local', {
// //         successRedirect: "/dashboard",
// //         failureRedirect: "/users/login",
// //         failureFlash: true
// //       })(req, res, next);
// // })

// // // logout handler
// // router.get("/logout", (req, res) => {
// //     req.logout();
// //     req.flash(
// //         "success_msg", 
// //         "You are logged out");
// //     res.redirect("/users/login");
// // })

// module.exports = router;