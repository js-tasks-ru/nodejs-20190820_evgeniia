const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {

  constructor(options) {
    super(options);
    this.options = options;
    this.limit = options.limit;
    this.data = '';
  }

  _transform(chunk, encoding, callback) {

    this.data += chunk;
    if (Buffer.byteLength(this.data) <= this.limit ) {
      this.push(chunk);
    }
    else {
      callback(new LimitExceededError());
    }
    callback(null);
  }

}

module.exports = LimitSizeStream;
