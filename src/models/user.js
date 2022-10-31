const db = require('../db');
const { hash } = require('../lib/hash');

function isEmailExist(email, callback) {
  db.get('SELECT email FROM user WHERE email = ?', email, callback);
}

function createUser(email, nickname, password, birthday, callback) {
  db.run(
    'INSERT INTO user (email, nickname, password, birthday) VALUES (?,?,?,?)',
    email,
    nickname,
    hash(password),
    birthday,
    callback,
  );
}

function signInUser(email, password, callback) {
  db.get(
    'SELECT id, email FROM user WHERE email = ? AND password = ?',
    email,
    hash(password),
    callback,
  );
}

function findUserById(userId, callback) {
  db.get(
    'SELECT id, email, nickname, birthday FROM user WHERE id = ?',
    userId,
    callback,
  );
}

module.exports = {
  createUser,
  isEmailExist,
  signInUser,
  findUserById,
};
