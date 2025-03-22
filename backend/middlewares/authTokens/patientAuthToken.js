import jwt from "jsonwebtoken";

// Patient Authentication Middleware with JSON response and message
export const patientAuthToken = (req, res, next) => {
  // Check if the token is in the Authorization header (Bearer token)
  const tokenFromHeader = req.headers["authorization"]?.split(" ")[1]; // "Bearer token_value"

  // Check if the token is in the cookies
  const tokenFromCookies = req.cookies?.patientToken;

  // Use token from the header if available, else use token from cookies
  const token = tokenFromHeader || tokenFromCookies;

  console.log(token);

  if (!token) {
    return res.status(401).json({
      isAuthenticated: false,
      message: "Patient token not found. Please log in.", // Message if no token is found
    });
  }

  // Verify the token
  jwt.verify(
    token,
    process.env.PATIENT_ACCESS_TOKEN_SECRET_KEY,
    (err, decoded) => {
      if (err) {
        return res.status(403).json({
          isAuthenticated: false,
          message: "Invalid or expired token. Please log in again.", // Message if token is invalid or expired
        });
      }

      // Attach patient data to request
      req.patientId = decoded?.id;
      req.isPatient = decoded?.isPatient;

      next();
    }
  );
};
