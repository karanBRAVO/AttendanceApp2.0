import * as bcrypt from "bcrypt";

export const createHash = (password) => {
  const hash = bcrypt.hashSync(password, 10);
  return hash.toString();
};

export const comparePassword = (hash, password) => {
  return bcrypt.compareSync(password, hash);
};
