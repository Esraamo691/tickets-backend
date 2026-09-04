import jwt from "jsonwebtoken";
import { tokenTypeEnum } from "../Enums/app.enum.js";
import * as DBService from "../../db/db.service.js";
import { UserModel } from "../../db/models/User.model.js";
export const generateToken = async ({
  payload = {},
  signature = process.env.ACCESS_TOKEN_SIGNATURE,
  options = {
    expiresIn: Number(process.env.ACCESS_TOKEN_EXPIRES_IN),
  },
} = {}) => {
  return jwt.sign(payload, signature, options);
};

export const verifyToken = async ({
  token = "",
  signature = process.env.ACCESS_TOKEN_SIGNATURE,
} = {}) => {
  return jwt.verify(token, signature);
};

export const decodeToken = async ({
  next,
  tokenType = tokenTypeEnum.access,
  authorization,
} = {}) => {
  const [bearer, token] = authorization?.split(" ") || [];
  if (!bearer || !token) {
    return next(new Error("missing token parts!🫣", { cause: 401 }));
  }
  const decoded = await verifyToken({
    token,
    signature:
      tokenType == tokenTypeEnum.access
        ? process.env.ACCESS_TOKEN_SIGNATURE
        : process.env.REFRESH_TOKEN_SIGNATURE,
  });
  if (!decoded?._id) {
    return next(new Error("ايووووو التوكن غلط", { cause: 400 }));
  }
  const user = await DBService.findById({ model: UserModel, id: decoded._id });
  if (!user) {
    return next(new Error("نسجل الاول بلاش خم", { cause: 404 }));
  }
  return { decoded, user };
};
