const jwt = require("jsonwebtoken");
const jwtKey = 'e-comm';

const createJWT = (payload) => {
    const token = jwt.sign(payload, jwtKey, {
      expiresIn:'1h',
    });
    
    return token;
  };

  const attachCookiesToResponse = ({ res, user }) => {
    const token = createJWT({ payload: user });
  
    const oneDay = 1000 * 60 * 60 * 24;
  
    res.cookie("tokens", token, {
      httpOnly: true,
      expires: new Date(Date.now() + oneDay),
      // secure: jwtKey === jwtKey,
      // signed: true,
    });
    return token;
  };
 
module.exports = {
    createJWT,
    attachCookiesToResponse
}