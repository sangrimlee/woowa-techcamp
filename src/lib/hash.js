const crypto = require('crypto');

function hash(password) {
  return crypto.createHash('sha512').update(password).digest('base64');
}

function compare(plainPassword, hashedPassword) {
  return (
    crypto.createHash('sha512').update(plainPassword).digest('base64') ===
    hashedPassword
  );
}

module.exports = {
  hash,
  compare,
};
