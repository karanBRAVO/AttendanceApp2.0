import { decodeToken } from "../utils/jwtTasks.js";

export const authenticate = (req, res, next) => {
  try {
    // getting the token
    const auth = req.headers.authorization;
    if (!auth) {
      const err = new Error(`Invalid authorization header.`);
      throw err;
    }
    const token = auth.split(" ")[1];

    // decode the token
    const decodedToken = decodeToken(token);

    // add it to the request
    req.userId = decodedToken.id;

    next();
  } catch (err) {
    res.json({ success: false, err: err.message });
  }
};
