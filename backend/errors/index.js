const CustomAPIError = require("./Custom-Api");

const UnauthenticatedError = require("./Unauthenticated");
const NotFoundError = require("./Not-Found");
const UnauthorizedError = require("./Unauthorize");



module.exports = {
  UnauthenticatedError,
  CustomAPIError,
  NotFoundError,
  UnauthorizedError

};
