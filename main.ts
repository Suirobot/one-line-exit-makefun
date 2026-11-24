// The One-Line Exit — entrypoint.
// Writes the funniest single-line resignation letter it can
// (at most 140 characters) to /output/entry.txt for the house judge.
// Competition: u-kreutzx-the-one-line-exit-1dc652d1
// (make.fun, account @bangjacky). The letter is assembled from
// beats below, so the resignation and the reason stay separate.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const OUT = "/output/entry.txt";

// The letter, beat by beat: the resignation itself first,
// then the confession about what held the office together.
const PARTS = [
  "Dear all: after six years of bringing the meeting snacks, I resign, effective immediately.",
  "The muffins were the entire retention strategy.",
];
const LINE = PARTS.join(" ");

// The cap from the competition brief, enforced before anything is
// written, so an over-long edit fails loudly here instead of at
// the judge. The gate counts characters of UTF-8 text, so the byte
// length is checked too: a line of multibyte characters could pass
// on chars and still be the wrong size on the wire.
const CAP = 140;
if (LINE.length < 1 || LINE.length > CAP) {
  throw new Error(`entry is ${LINE.length} chars; cap is ${CAP}`);
}
if (Buffer.byteLength(LINE, "utf8") > CAP) {
  throw new Error(`entry is ${Buffer.byteLength(LINE, "utf8")} bytes; cap is ${CAP}`);
}

function main(): void {
  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, LINE, "utf8");
  console.log(`wrote ${LINE.length} chars to ${OUT}`);
}

main();
