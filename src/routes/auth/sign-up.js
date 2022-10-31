const express = require('express');
const { AGREE_LIST } = require('../../constants/agree');

const router = express.Router();

router.get('/', (req, res) => {
  res.redirect('/auth/sign-up/agree');
});

router.get('/agree', (req, res) => {
  res.render('pages/sign-up/agree', {
    title: '회원가입',
    headerTitle: '회원가입',
    headerRightLink: 'close',
    headerRightHref: '/',
    agreeList: AGREE_LIST,
  });
});

router.post('/agree', (req, res) => {
  res.redirect('/auth/sign-up/verify-phone');
});

router.get('/verify-phone', (req, res) => {
  res.render('pages/sign-up/verify-phone', {
    title: '회원가입',
    headerTitle: '회원가입',
    headerRightLink: 'arrow-left',
    headerRightHref: '/auth/sign-up/agree',
    headerLeftLabel: '다음',
  });
});

router.get('/additional-info', (req, res) => {
  res.render('pages/sign-up/additional-info', {
    title: '회원가입',
    headerTitle: '회원가입',
    headerRightLink: 'arrow-left',
    headerRightHref: '/auth/sign-up/verify-phone',
    headerLeftLabel: '완료',
  });
});

module.exports = router;
