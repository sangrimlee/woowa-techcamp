const { createUUID } = require('../lib/uuid');
const { createSession } = require('../models/session');
const { createUser, isEmailExist, signInUser } = require('../models/user');

function signUp(req, res) {
  const { email, nickname, password, birthday } = req.body;

  isEmailExist(email, (isEmailExistError, user) => {
    if (isEmailExistError) {
      res.status(500).json({
        ok: false,
        errorMessage: isEmailExistError.message,
      });
    } else if (user) {
      res.status(400).json({
        ok: false,
        errorMessage: '이미 존재하는 이메일 계정입니다.',
      });
    } else {
      createUser(email, nickname, password, birthday, (createUserError) => {
        if (createUserError) {
          res.status(500).json({
            ok: false,
            errorMessage: createUserError.message,
          });
        } else {
          res.status(201).json({
            ok: true,
          });
        }
      });
    }
  });
}

function signIn(req, res) {
  const { email, password } = req.body;

  signInUser(email, password, (signInUserError, user) => {
    if (signInUserError) {
      res.status(500).json({
        ok: false,
        errorMessage: signInUserError.message,
      });
    } else if (!user) {
      res.status(404).json({
        ok: false,
        errorMessage: '해당하는 로그인 정보를 찾을 수 없습니다.',
      });
    } else {
      const sid = createUUID();
      createSession(user.id, sid, (createSessionError) => {
        if (createSessionError) {
          res.status(500).json({
            ok: false,
            errorMessage: createSessionError.message,
          });
        } else {
          res
            .status(201)
            .cookie('sid', sid, {
              maxAge: 60 * 60 * 24 * 30,
              path: '/',
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
            })
            .json({
              ok: true,
            });
        }
      });
    }
  });
}

function checkEmail(req, res) {
  const { email } = req.query;

  isEmailExist(email, (isEmailExistError, user) => {
    if (isEmailExistError) {
      res.status(500).json({
        ok: false,
        errorMessage: isEmailExistError.message,
      });
    } else if (user) {
      res.status(400).json({
        ok: false,
        errorMessage: '이미 존재하는 이메일 계정입니다.',
      });
    } else {
      res.status(200).json({
        ok: true,
      });
    }
  });
}

function signOut(req, res) {
  res
    .status(200)
    .cookie('sid', '', {
      maxAge: 0,
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    })
    .redirect('/');
}

module.exports = {
  signUp,
  signIn,
  checkEmail,
  signOut,
};
