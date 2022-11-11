const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const jwtKey = 'e-comm';

// const verify = (req, res, next) => {
//   const token = req.cookies.tokens;
//   if (!token) {
//        res.status(403).json("Token is not valid");
//     }
//     try {
//       const data = jwt.verify(token, jwtKey);
//       req.userId = data.id;
//       next()
//     } catch {
//       res.send({msg:"somthing wrong"})
//     }
// }

const verify = (req, res, next) => {
  const authHeader = req.headers.tokens;
  if (authHeader) {
    jwt.verify(authHeader, jwtKey, (err, user) => {
      if (err) res.status(403).json("Token is not valid");
      req.user = user;
      next();
    });
  } else {
    return res.status(402).json("You are not authorized");
  }
}

module.exports = {verify}