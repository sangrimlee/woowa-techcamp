const express = require('express');
const signInRouter = require('./sign-in');
const signUpRouter = require('./sign-up');

const router = express.Router();

router.use((req, res, next) => {
  const { session } = req;
  if (session) {
    res.redirect('/');
  }
  next();
});

router.use('/sign-in', signInRouter);
router.use('/sign-up', signUpRouter);

module.exports = router;
