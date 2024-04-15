import mongoose, { Schema } from "mongoose";

const requestSchema = new Schema(
  {
    issuer: String,
    shopname: String,
    approver: String,
    description: String,
  },
  {
    timestamps: true,
  }
);

const requestdb =
  mongoose.models.requestdb ||
  mongoose.model("requestdb", requestSchema);

export default requestdb;
