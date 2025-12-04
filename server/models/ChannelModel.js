import mongoose from "mongoose";
import bcrypt from "bcrypt";

const channelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Channel Name is required"],
    },
    members: [{ type: mongoose.Schema.ObjectId, ref: "User", required: true }],

    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },

    messages: [
      { type: mongoose.Schema.ObjectId, ref: "Message", required: false },
    ],
  },
  {
    timestamps: true,
  }
);

const Channel = mongoose.model("Channel", channelSchema);

export default Channel;
