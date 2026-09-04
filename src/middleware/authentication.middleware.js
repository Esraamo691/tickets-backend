import { tokenTypeEnum } from "../utils/Enums/app.enum.js";
import { asyncHandler } from "../utils/response.js";
import { decodeToken } from "../utils/security/token.security.js";

export const authentication = ({ tokenType = tokenTypeEnum.access } = {}) => {
  return asyncHandler(async (req, res, next) => {
    const { user, decoded } = await decodeToken({
      next,
      tokenType,
      authorization: req.headers.authorization,
    });
    req.user = user;
    req.decoded = decoded;
    return next();
  });
};

export const authorization = ({ accessRole = [] } = {}) => {
  return asyncHandler(async (req, res, next) => {
    if (!accessRole.includes(req.user.role)) {
      return next(new Error("Not authorized account", { cause: 403 }));
    }
    return next();
  });
};
export const auth = ({
  tokenType = tokenTypeEnum.access,
  accessRole = [],
} = {}) => {
  return asyncHandler(async (req, res, next) => {
    const { user, decoded } = await decodeToken({
      next,
      tokenType,
      authorization: req.headers.authorization,
    });
    req.user = user;
    req.decoded = decoded;

    if (!accessRole.includes(req.user.role)) {
      return next(new Error("Not authorized account", { cause: 403 }));
    }
    return next();
  });
};
