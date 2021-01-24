const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server");

let secret = "top_secret_key";

module.exports = (context) => {
  const authHeader = context.req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, secret);
        return user;
      } catch (err) {
        throw new AuthenticationError("Invalid / Expired Token");
      }
    }
    throw new Error("Authentication token must be Bearer [token]");
  }
  throw new Error("Authentication header must be provided");
};
