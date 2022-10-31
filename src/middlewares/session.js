const { getSession } = require('../models/session');
const { findUserById } = require('../models/user');

function session(req, res, next) {
  const sid = req.cookies['sid'];

  getSession(sid, (getSessionError, session) => {
    findUserById(session?.uid, (findUserByIdError, user) => {
      req.session = user;
      next();
    });
  });
}

module.exports = session;
