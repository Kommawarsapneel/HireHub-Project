const { body, validationResult, header } = require("express-validator");
exports.SignValidator = [
body("name").isLength({min:3,max:30}).isString().trim().withMessage("Name is required"),
body("username").isLength({min:3,max:30}).isString().trim().withMessage("Username is required"),
body("email").trim().isLength({max:40}).isEmail().withMessage("Email is required"),
body("password").isLength({min:6,max:30}).isString().trim().withMessage("Password is required"),
body("role").isString().trim().withMessage("Role is required"),

  (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      const err = {
        message: "Validation Signin Error",
        statusCode: 400,
      };
      next(err);
    }
    next();
  },
];
// exports.LoginValidators=[
// body("email").isEmail().isLength({min:3,max:30}).trim().withMessage("Email Required"),
// body("password").isString().trim().withMessage("Password Required"),
// body("role").isString().trim().withMessage("Role is Required"),(req,res,next)=>{
//   const error=validationResult(req);
//   if(!error.isEmpty()){
// const err = {
//         message: "Validation Login  Error",
//         statusCode: 400,
//       };
//       next(err);
//   }
//   next();
// }
// ]
exports.LoginValidators = [
  body("email")
    .isEmail()
    .isLength({ min: 3, max: 30 })
    .trim()
    .withMessage("Email is required and must be valid"),
    
  body("password")
    .isString()
    .notEmpty()
    .trim()
    .withMessage("Password is required"),
    
  body("role")
    .isString()
    .notEmpty()
    .trim()
    .withMessage("Role is required"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        statusCode: 400,
        message: "Validation Login Error",
        errors: errors.array(),
      });
    }

    next();
  },
];
exports.TokenValidators = [
  header("authorization").isString().withMessage("Required Invalid Token"),
];
const editProfileVadilitor = [
  body("name")
    .isLength({ min: 2, max: 12 })
    .isString()
    .trim()
    .withMessage("Name Required"),
  body("email")
    .isLength({ min: 2, max: 89 })
    .isString()
    .trim()
    .withMessage("Email Required"),
  body("password").isString().trim().withMessage("Password Required"),
];
exports.validateMiddleware = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = {
      message: "Validation Login Error",
      statusCode: 400,
      errors: errors.array(), // send validation details if needed
    };
    return next(err); // stop here and pass error
  }

  // if no error, continue
  next();
};




















































