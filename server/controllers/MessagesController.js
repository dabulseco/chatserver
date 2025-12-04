import Message from "../models/MessageModel.js";
import { mkdirSync, renameSync } from 'fs';

export const getMessages = async (req, res, next) => {
  try {
    const loginUser = req.user.userId;
    const connectUser = req.body.id;

    if (!loginUser || !connectUser) {
      res.status(400).json({ message: "Both user ID is required" });
    }

    const messages = await Message.find({
      $or: [
        { sender: loginUser, recipient: connectUser },
        { sender: connectUser, recipient: loginUser },
      ],
    }).sort({ timestamp: 1 });

    res.status(200).json({ messages });
  } catch (error) {
    res.status(500).json({ message: "Server error", error }); 
  }
};

export const uploadFile = async (req, res, next) => {
  try {
    if(!req.file) {
      res.status(400).json({ message: 'file is required' });  
    }
    const date = Date.now();
    const fileDir = `uploads/files/${date}`
    let fileName = `${fileDir}/${req.file.originalname}`
    mkdirSync(fileDir, {recursive: true})
    renameSync(req.file.path, fileName);

    res.status(200).json({ filePath: fileName });
  } catch (error) {
    res.status(500).json({ message: "Server error", error }); 
  }
};
