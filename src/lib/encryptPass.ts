
import Cryptr from "cryptr";

export const cryptr = new Cryptr(
  "346faf5c5725f7e519ca7fedd1755a74d8034193c1764356109f40509c0ffc2b",
  {
    encoding: "hex",
    pbkdf2Iterations: 10000,
    saltLength: 10,
  },
);