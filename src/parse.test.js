const { test } = require("ava");
const { parseLine, parseFrac, serializeNumber } = require("./parse");

test("parseFrac", t => {
  t.deepEqual(parseFrac("1_2/3"), { whole: 1, num: 2, den: 3 });
  t.deepEqual(parseFrac(" 2/4"), { whole: 0, num: 2, den: 4 });
  t.deepEqual(parseFrac(" 4  "), { whole: 4, num: 0, den: 1 });
  t.deepEqual(parseFrac("-2_1/3 "), { whole: -2, num: 1, den: 3 });
  t.deepEqual(parseFrac("-3/4"), { whole: 0, num: -3, den: 4 });
});

test("parseFrac invalid input", t => {
  t.throws(() => parseFrac("2/4/3"));
  t.throws(() => parseFrac("1_2"));
  t.throws(() => parseFrac("1_ "));
  t.throws(() => parseFrac("1_/3 "));
  t.throws(() => parseFrac("_2/3 "));
  t.throws(() => parseFrac(" "));
});

test("parseLine", t => {
  t.deepEqual(parseLine(" 1_1/3 +   2"), {
    n1: { whole: 1, num: 1, den: 3 },
    operand: "+",
    n2: { whole: 2, num: 0, den: 1 }
  });
});

test("parseLine invalid input", t => {
  t.throws(() => parseLine("4/3"));
  t.throws(() => parseLine("4/3+1/2"));
  t.throws(() => parseLine("4/3 + 1/2 - 2"));
});

test("serializeNumber", t => {
  t.is(serializeNumber({ whole: 22, num: 1, den: 2 }), "22_1/2");
  t.is(serializeNumber({ whole: 0, num: 1, den: 2 }), "1/2");
  t.is(serializeNumber({ whole: 3, num: 0, den: 1 }), "3");
});
