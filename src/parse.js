const R = require("ramda");
const assert = require("assert");

const parseWholeFrac = input => {
  const [res, whole, num, den] = R.match(/^(\-?\d+)_(\d+)\/(\d+)$/, input);
  return res && { whole, num, den };
};

const parsePartialFrac = input => {
  const [res, num, den] = R.match(/^(\-?\d+)\/(\d+)$/, input);
  return res && { whole: 0, num, den };
};

const parseWholeNumber = input => {
  const [res, whole] = R.match(/^(\-?\d+)$/, input);
  return res && { whole, num: 0, den: 1 };
};

const numberize = R.map(Number);

const parseFrac = input => {
  const tin = input.trim();
  const frac =
    parseWholeFrac(tin) || parsePartialFrac(tin) || parseWholeNumber(tin);

  if (!frac) {
    throw new Error(`Invalid fraction: "${tin}"`);
  }
  return numberize(frac);
};

const parseLine = input => {
  const [res, n1, operand, n2] = R.match(/(.*)\s+([\+\-\*\/])\s+(.*)$/, input);
  if (!res) {
    throw new Error(`Invalid input: "${input}"`);
  }

  return {
    n1: parseFrac(n1),
    operand,
    n2: parseFrac(n2)
  };
};

const serializeNumber = ({ whole, num, den }) => {
  assert(den !== undefined);
  assert(num !== undefined);
  assert(whole != undefined);

  let frac;
  if (num !== 0) {
    frac = R.join("/", [num, den]);
  }

  if (whole !== 0) {
    return frac ? R.join("_", [whole, frac]) : whole.toString();
  }
  return frac;
};

module.exports = {
  parseLine,
  parseFrac,
  serializeNumber
};
