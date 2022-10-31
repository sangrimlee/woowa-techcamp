const express = require('express');
const { SOCIAL_LIST } = require('../../constants/social');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('pages/sign-in', {
    title: '로그인',
    headerRightLink: 'close',
    headerRightHref: '/',
    socialList: SOCIAL_LIST,
  });
});

module.exports = router;
