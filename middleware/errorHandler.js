export const errorHandler = (err, req, res, next) => {
    // Use statusCode if set, otherwise default to 500
    const statusCode = res.statusCode || 500;
  
    let errorResponse = {
      title: "Error",
      message: err.message,
      stack: process.env.NODE_ENV === "production" ? null : err.stack, // Hide stack trace in production
    };
  
    // Customize title based on status code
    switch (statusCode) {
      case 400:
        errorResponse.title = "Validation Failed";
        break;
      case 401:
        errorResponse.title = "Unauthorized";
        break;
      case 403:
        errorResponse.title = "Forbidden";
        break;
      case 404:
        errorResponse.title = "Not Found";
        break;
      case 500:
      default: // Handles 500 and any undefined status codes
        errorResponse.title = "Internal Server Error";
        break;
    }
  
    // Set response status and return the error in JSON format
    res.status(statusCode).json(errorResponse);
  };
  