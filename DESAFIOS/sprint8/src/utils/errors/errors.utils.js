const errors = {
    forbidden: { message: "Forbidden", statusCode: 403 },
    notFound: { message: "Not Found", statusCode: 404 },
    fatal: { message: "Fatal", statusCode: 500 },
    error: { message: "Error", statusCode: 400 },
    token: { message: "Invalid verified token!", statusCode: 400 },
    auth: { message: "Invalid credentials", statusCode: 401 },
    message: (message) => ({ message, statusCode: 400 }),
    callbackPass: (message, statusCode) => ({ message, statusCode }),
    userExist: { message: "User already exists", statusCode: 401 },
    no8char: { message: "Password must have at least 8 characters", statusCode: 400},
    
}
  
export default errors