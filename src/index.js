const { compose } = require("ramda");
const readline = require("readline");
const { parseLine, serializeNumber } = require("./parse");
const calculate = require("./calculate");

const inOut = compose(
  serializeNumber,
  calculate,
  parseLine
);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "? "
});

console.log("Enter your question (ctrl+c to end). Example '? 1/2 * 3_3/4':");
rl.prompt();

rl.on("line", input => {
  try {
    console.log(`= ${inOut(input)}`);
  } catch (err) {
    console.log(err.message);
  }
  rl.prompt();
}).on("close", () => {
  console.log("\nYou know everything? Bye!");
  process.exit(0);
});
