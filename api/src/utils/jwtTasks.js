import jwt from "jsonwebtoken";

export const getToken = (key) => {
  const token = jwt.sign({ id: key }, process.env.JWT_SECRET_KEY);
  return token;
};

export const decodeToken = (token) => {
  const decodedToken = jwt.decode(token, process.env.JWT_SECRET_KEY);
  return decodedToken;
};
