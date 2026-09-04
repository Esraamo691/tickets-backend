import { Types } from "mongoose";
import joi from "joi";
import { asyncHandler } from "../utils/response.js";
export const generalFields = {
  fullName: joi
    .string()
    .pattern(new RegExp(/^[A-Z][a-z]{1,19}\s{1}[A-Z][a-z]{1,19}$/))
    .min(2)
    .max(20)
    .message({
      "string.min": "min name length is 2 char",
      "any.required": "fullName is mandatory",
    }),
  email: joi
    .string()
    .pattern(
      new RegExp(
        /^(?=.*[a-zA-Z])\w.{5,50}@{1}(gmail|yahoo|icloud)(\.com|\.net|\.edu){1,2}$/,
      ),
    )
    .email({
      minDomainSegments: 2,
      maxDomainSegments: 3,
      tlds: { allow: ["com", "net", "edu"] },
    }),
  password: joi
    .string()
    .pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)),
  phone: joi.string().pattern(new RegExp(/^(002|\+2)?01[0125][0-9]{8}$/)),
  confirmPassword: joi.string().valid(joi.ref("password")),
  otp: joi.string().pattern(new RegExp(/^\d{6}$/)),
  id: joi.string().custom((value, helper) => {
    return Types.ObjectId.isValid(value) || helper.message("in valid objectId");
  }),
  file: {
    fieldname: joi.string().required(),
    originalname: joi.string().required(),
    encoding: joi.string().required(),
    mimetype: joi.string().required(),
    destination: joi.string().required(),
    filename: joi.string().required(),
    path: joi.string().required(),
    size: joi.number().positive().required(),
  },
};
export const validation = (schema) => {
  return asyncHandler(async (req, res, next) => {
    const validationError = [];
    for (const key of Object.keys(schema)) {
      const validationResult = schema[key].validate(req[key], {
        abortEarly: false,
      });
      if (validationResult.error) {
        validationError.push({
          key,
          details: validationResult.error.details.map((element) => {
            return { messsage: element.messsage, path: element.path[0] };
          }),
        });
      }
      // console.log("=====================");
    }
    if (validationError.length) {
      return res
        .status(400)
        .json({ error_message: "Validation error", validationError });
    }
    return next();
  });
};
