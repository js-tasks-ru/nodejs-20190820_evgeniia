const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
  constructor(options) {
    super(options);
    this.lastData = '';
  }

  _transform(chunk, encoding, callback) {

    var data = chunk.toString();
    if (this.lastData) {
      data = this.lastData + data;
    }

    var lines = data.split(os.EOL);
    this.lastData = lines.pop(); //.splice(lines.length-1,1)[0];

    lines.forEach(this.push.bind(this));
    callback();

  }

  _flush(callback) {
    if (this.lastData) this.push(this.lastData);
     this.lastData = null;
     callback();
  }
}

module.exports = LineSplitStream;
