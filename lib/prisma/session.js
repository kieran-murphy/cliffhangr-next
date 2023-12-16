import jwt from "jsonwebtoken";

export async function validateSession(token) {
  let decodedToken;
  try {
    // Verify the token. If the token is invalid, jwt.verify() will throw an error.
    jwt.verify(token, process.env.JWT_SECRET);
    decodedToken = jwt.decode(token); // Decoding is safe after verification
    // Check if the decoded token has a username
    if (decodedToken && decodedToken.hasOwnProperty("username")) {
      const username = decodedToken.username;
      return { status: 200, body: { username, error: null } };
    }
    // If the token is valid but doesn't have the required 'username' property
    return {
      status: 400,
      body: { username: null, error: "Invalid token structure" },
    };
  } catch (error) {
    // Catch any errors, such as token being invalid, expired, or not provided
    return { status: 401, body: { username: null, error: error.message } };
  }
}
