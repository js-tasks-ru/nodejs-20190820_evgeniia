function sum(a, b) {
  var res = 0;
  if (Number(a) === a && Number(b) === b) {
    res = a + b;
    return res;
  }
  else {
    throw new TypeError('not valid params');
  }
}

module.exports = sum;
