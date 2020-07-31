const { test } = require("ava");
const {
  gcd,
  simplify,
  wholeify,
  normalize,
  add,
  subtract,
  multiply,
  divide
} = require("./operations");

test("gcd", t => {
  t.is(gcd(1, 3), 1);
  t.is(gcd(2, 3), 1);
  t.is(gcd(3, 3), 3);
  t.is(gcd(-4, 2), 2);
  t.is(gcd(14, 21), 7);
  t.is(gcd(100, 25), 25);
  t.is(gcd(0, 1), 1);
});

test("normalize", t => {
  t.deepEqual(
    normalize({
      whole: 2,
      num: 1,
      den: 2
    }),
    {
      num: 5,
      den: 2
    }
  );
  t.deepEqual(
    normalize({
      whole: -1,
      num: 2,
      den: 3
    }),
    {
      num: -5,
      den: 3
    }
  );
  t.deepEqual(
    normalize({
      whole: -1,
      num: 0,
      den: 1
    }),
    {
      num: -1,
      den: 1
    }
  );
});

test("wholeify", t => {
  t.deepEqual(wholeify({ num: 3, den: 2 }), {
    whole: 1,
    num: 1,
    den: 2
  });
  t.deepEqual(wholeify({ num: 9, den: 4 }), {
    whole: 2,
    num: 1,
    den: 4
  });
  t.deepEqual(wholeify({ num: -5, den: 3 }), {
    whole: -1,
    num: 2,
    den: 3
  });
});

test("simplify", t => {
  t.deepEqual(simplify({ num: 6, den: 4 }), {
    num: 3,
    den: 2
  });
  t.deepEqual(simplify({ num: 9, den: 4 }), {
    num: 9,
    den: 4
  });
  t.deepEqual(simplify({ num: 12, den: 3 }), {
    num: 4,
    den: 1
  });
});

test("simplify with negative", t => {
  t.deepEqual(simplify({ num: -2, den: 1 }), {
    num: -2,
    den: 1
  });
  t.deepEqual(simplify({ num: -10, den: 4 }), {
    num: -5,
    den: 2
  });
});

test("simplify throws on assertions", t => {
  t.throws(() => simplify({ num: 1, den: -2 }));
});

test("add", t => {
  t.deepEqual(add({ num: 19, den: 8 }, { num: 9, den: 8 }), {
    num: 7,
    den: 2
  });
});

test("subtract", t => {
  t.deepEqual(subtract({ num: 19, den: 8 }, { num: 9, den: 8 }), {
    num: 5,
    den: 4
  });

  t.deepEqual(subtract({ num: -1, den: 2 }, { num: 1, den: 3 }), {
    num: -5,
    den: 6
  });
});

test("multiply", t => {
  t.deepEqual(multiply({ num: 1, den: 2 }, { num: 15, den: 4 }), {
    num: 15,
    den: 8
  });
  t.deepEqual(multiply({ num: -1, den: 2 }, { num: 1, den: 4 }), {
    num: -1,
    den: 8
  });
  t.deepEqual(multiply({ num: -1, den: 1 }, { num: -1, den: 4 }), {
    num: 1,
    den: 4
  });
  t.deepEqual(multiply({ num: 0, den: 1 }, { num: 6, den: 1 }), {
    num: 0,
    den: 1
  });
});

test("divide", t => {
  t.deepEqual(divide({ num: 1, den: 2 }, { num: 1, den: 4 }), {
    num: 2,
    den: 1
  });
});

test("division by zero", t => {
  t.throws(() => {
    return divide({ num: 1, den: 2 }, { num: 0, den: 0 });
  });
});
