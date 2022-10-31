const express = require('express');
const { MY_MENU_LIST, MENU_LIST } = require('../constants/menu');
const apiRouter = require('./api');
const authRouter = require('./auth');

const router = express.Router();

router.get('/', (req, res) => {
  const { session } = req;

  res.render('pages/index', {
    title: 'My배민',
    headerTitle: 'My배민',
    myMenuList: MY_MENU_LIST,
    menuList: [
      ...MENU_LIST,
      ...(session ? [{ title: '로그아웃', href: '/api/sign-out' }] : []),
    ],
    session,
  });
});

router.use('/api', apiRouter);
router.use('/auth', authRouter);

router.get('/*', (req, res) => {
  res.render('pages/404');
});

module.exports = router;
