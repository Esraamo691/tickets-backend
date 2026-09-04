import mongoose from "mongoose";
import { providerEnum, roleEnum } from "../../utils/Enums/app.enum.js";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: [
        20,
        "firstName max length is 20 char and you have entered {VALUE}",
      ],
    },
    lastName: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: [
        20,
        "lastName max length is 20 char and you have entered {VALUE}",
      ],
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: function () {
        this.provider == providerEnum.system ? true : false;
      },
    },
    password: {
      type: String,
      required: function () {
        this.provider == providerEnum.system ? true : false;
      },
    },
    oldPasswords: [String],
    avatar_Image: {
      secure_url: String,
      public_id: String,
    },
    role: {
      type: String,
      enum: Object.values(roleEnum),
      default: roleEnum.user,
    },
    provider: {
      type: String,
      enum: Object.values(providerEnum),
      default: providerEnum.system,
    },
    is_verified: Boolean,
    confirmEmail: Date,
    confirmEmailOtp: String,
    forgotPasswordOtp: String,
    deletedAt: Date,
    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    restoredAt: Date,
    restoredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  },
);
userSchema
  .virtual("fullName")
  .set(function (value) {
    const [firstName, lastName] = value?.split(" ") || [];
    this.set({ firstName, lastName });
  })
  .get(function () {
    return this.firstName + " " + this.lastName;
  });
export const UserModel =
  mongoose.models.User || mongoose.model("User", userSchema);
UserModel.syncIndexes();
