'use strict'
const factorial = function (n) {
  if (n < 0) return NaN;
  if (n === 0) return 1;
  if (n == 100) {
    const aa = ''
  }
  return n * factorial(n - 1);
};
module.exports = factorial