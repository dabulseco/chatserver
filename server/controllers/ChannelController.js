import User from "../models/UserModel.js";
import Channel from "../models/ChannelModel.js";
import mongoose from "mongoose";

export const createChannel = async (req, res, next) => {
  try {
    const { name, members } = req.body;
    console.log(members);
    const userId = req.user.userId;
    const admin = await User.findById(userId);
    if (!admin) {
      res.status(400).json({ message: "User not found" });
    }
    const validMembers = await User.find({ _id: { $in: members } });
    if (validMembers.length !== members.length) {
      res.status(400).json({ message: "Some members are not valid users" });
    }
    const newChannel = new Channel({
      name,
      members,
      admin: userId,
    });
    await newChannel.save();
    return res.status(201).json({ channel: newChannel });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getUserChannels = async (req, res, next) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.userId);
    const channels = await Channel.find({
      $or: [{ admin: userId }, { members: userId }],
    }).sort({ updatedAt: -1 });
    return res.status(200).json({ channels });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
export const getChannelMessages = async (req, res, next) => {
  try {
    const { channelId } = req.params;
    console.log(channelId)
    const channel = await Channel.findById(channelId).populate({
      path: "messages",
      populate: {
        path: "sender",
        select: "_id email firstName lastName images color",
      },
    });
    if(!channel) {
      res.status(400).json({ message: "Channel not found" });
    }
    const messages = channel.messages
    return res.status(200).json({ messages });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
