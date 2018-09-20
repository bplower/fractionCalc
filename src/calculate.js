const { compose } = require("ramda");
const { parseLine, serializeNumber } = require("./parse");

const {
  add,
  subtract,
  multiply,
  divide,
  normalize,
  wholeify
} = require("./operations");

const operandToOperation = {
  "+": add,
  "-": subtract,
  "*": multiply,
  "/": divide
};

const calculate = ({ n1, operand, n2 }) =>
  wholeify(operandToOperation[operand](normalize(n1), normalize(n2)));

const calculateStr = compose(
  serializeNumber,
  calculate,
  parseLine
);

module.exports = {
  calculateStr,
  calculate
};
