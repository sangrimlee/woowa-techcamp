const db = require('../db');

function createSession(uid, sid, callback) {
  db.run('INSERT INTO session (uid, sid) VALUES (?,?)', uid, sid, callback);
}

function getSession(sid, callback) {
  db.get('SELECT * FROM session WHERE sid = ?', sid, callback);
}

module.exports = {
  createSession,
  getSession,
};
