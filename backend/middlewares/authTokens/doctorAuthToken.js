import jwt from "jsonwebtoken";

// Doctor Authentication Middleware with JSON response and message
export const doctorAuthToken = (req, res, next) => {
  const token = req.cookies?.doctorToken; // Extract token from Authorization header
  console.log(token);

  if (!token) {
    return res.status(401).json({
      isAuthenticated: false,
      message: "Doctor token not found. Please log in.", // Message if no token is found
    });
  }

  // Verify the token
  jwt.verify(
    token,
    process.env.DOCTOR_ACCESS_TOKEN_SECRET_KEY,
    (err, decoded) => {
      if (err) {
        return res.status(403).json({
          isAuthenticated: false,
          message: "Invalid or expired token. Please log in again.", // Message if token is invalid or expired
        });
      }

      // Attach doctor data to request
      req.doctorId = decoded?.id;
      req.isDoctor = decoded?.isDoctor;

      next();
    }
  );
};
