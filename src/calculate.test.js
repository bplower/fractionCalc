const { test } = require("ava");
const { calculate, calculateStr } = require("./calculate");

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

test("calculateStr", t => {
  t.is(calculateStr(" 1 + 1_2/4"), "2_1/2");
  t.is(calculateStr("-1 + 2"), "1");
  t.is(calculateStr("-1 - 1/2"), "-1_1/2");
  t.is(calculateStr("-2 * 1/2"), "-1");
  t.is(calculateStr("-1 * 1/2"), "-1/2");

  t.throws(() => calculateStr("1/3"));
});
