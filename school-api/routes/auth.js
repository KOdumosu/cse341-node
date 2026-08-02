const express = require('express');
const router = express.Router();

const passport = require('../config/passport');


// Start GitHub login
router.get(
  '/github',
  passport.authenticate('github', {
    scope: ['user:email']
  })
);


// GitHub callback
router.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/auth/failure'
  }),
  (req, res) => {
    res.redirect('/auth/success');
  }
);


// Login success
router.get('/success', (req, res) => {
  res.status(200).json({
    message: "Authentication successful",
    user: req.user
  });
});


// Login failure
router.get('/failure', (req, res) => {
  res.status(401).json({
    message: "Authentication failed"
  });
});


// Check authentication status
router.get('/status', (req, res) => {

  if (req.isAuthenticated()) {

    return res.status(200).json({
      authenticated: true,
      user: req.user
    });

  }

  return res.status(401).json({
    authenticated: false,
    message: "User is not logged in"
  });

});


// Logout
router.get('/logout', (req, res, next) => {

  req.logout((err) => {

    if (err) {
      return next(err);
    }

    res.status(200).json({
      message: "Logged out successfully"
    });

  });

});


module.exports = router;