const { compose } = require("ramda");
const assert = require("assert");

const gcd = (a, b) => {
  return b ? gcd(b, a % b) : a >= 0 ? a : -a;
};

const normalize = ({ whole = 0, num, den }) =>
  simplify({
    num: whole >= 0 ? whole * den + num : whole * den - num,
    den
  });

const wholeify = ({ num, den }) => {
  assert(den >= 0);

  const whole = Math.trunc(num / den);
  return {
    whole,
    num: whole > 0 ? num % den : -1 * (num % den),
    den
  };
};

const simplify = ({ num, den }) => {
  assert(den >= 0);

  const cd = gcd(num % den, den);

  return {
    num: num / cd,
    den: den / cd
  };
};

const add = (n1, n2) => ({
  num: n1.num * n2.den + n2.num * n1.den,
  den: n1.den * n2.den
});

const subtract = (n1, n2) => ({
  num: n1.num * n2.den - n2.num * n1.den,
  den: n1.den * n2.den
});

const multiply = (n1, n2) => ({
  num: n1.num * n2.num,
  den: n1.den * n2.den
});

const divide = (n1, n2) => {
  if (n2.num === 0 || n2.den === 0) {
    throw new Error("Division by zero");
  }
  return {
    num: n1.num * n2.den,
    den: n1.den * n2.num
  };
};

module.exports = {
  add: compose(
    simplify,
    add
  ),
  subtract: compose(
    simplify,
    subtract
  ),
  multiply: compose(
    simplify,
    multiply
  ),
  divide: compose(
    simplify,
    divide
  ),
  wholeify,

  /* for tests */
  gcd,
  simplify,
  normalize
};
