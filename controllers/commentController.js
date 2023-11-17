import CommentModel from "../models/Comment.js";
import { validationResult } from "express-validator";

export const create = async (req, res) => {
  try {
    const doc = new CommentModel({
      text: req.body.text,
      post: req.body.post,
      user: req.userId,
    });
    const post = await doc.save();
    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось создать статью",
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const commentsByData = await CommentModel.find()
      .limit(5)
      .sort({ createdAt: -1 })
      .populate("user")
      .exec();

    res.json(commentsByData);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить все комментарии",
    });
  }
};

export const getAllById = async (req, res) => {
  try {
    const { id } = req.params;
    const commentsByData = await CommentModel.find({ post: id }).populate("user").exec();
    return res.json(commentsByData);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить все комментарии",
    });
  }
};
