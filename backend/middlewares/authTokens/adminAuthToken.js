import jwt from "jsonwebtoken";

// Admin Authentication Middleware with JSON response and isAuthenticated logic
export const adminAuthToken = (req, res, next) => {
  // Retrieve token from cookie or header
  const token = req.cookies.adminToken;
  console.log(token);
  if (!token) {
    // No token, return isAuthenticated as false
    return res.status(200).json({
      isAuthenticated: false,
      message: "Admin token not found. Please log in.", // Message for missing token
    });
  }
  // Verify the token
  jwt.verify(
    token,
    process.env.ADMIN_ACCESS_TOKEN_SECRET_KEY,
    (err, decoded) => {
      if (err) {
        // Invalid or expired token
        return res.status(200).json({
          isAuthenticated: false,
          message: "Invalid or expired token. Please log in again.",
        });
      }

      // Attach admin data to request
      req.adminId = decoded?.id;
      req.isAdmin = decoded?.isAdmin;

      // Return isAuthenticated as true if the token is valid
      next();
    }
  );
};
