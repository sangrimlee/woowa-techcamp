const crypto = require('crypto');

function createUUID(options) {
  return crypto.randomUUID(options);
}

module.exports = {
  createUUID,
};
