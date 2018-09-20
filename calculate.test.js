const { test } = require("ava");
const calculate = require("./calculate");

test("calculate", t => {
  t.deepEqual(
    calculate({
      n1: { whole: 1, num: 1, den: 3 },
      operand: "+",
      n2: { whole: 2, num: 0, den: 1 }
    }),
    { whole: 3, num: 1, den: 3 }
  );
  t.deepEqual(
    calculate({
      n1: { whole: 1, num: 3, den: 4 },
      operand: "/",
      n2: { whole: 0, num: 5, den: 3 }
    }),
    { whole: 1, num: 1, den: 20 }
  );
});
