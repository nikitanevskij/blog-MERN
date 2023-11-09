import PostModel from "../models/Post.js";
import { validationResult } from "express-validator";

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate("user").exec(); // если не вызывать два последних метода, вернется только id пользователя
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить все статьи",
    });
  }
};
export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;

    await PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: "after",
      },
    )
      .populate("user")
      .exec()
      .then((doc) => {
        if (!doc) {
          return res.status(404).json({
            message: "Не удалось найти статью",
          });
        }
        res.json(doc);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({
          message: "Не удалось вернуть статью",
        });
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить запрошенную статью",
    });
  }
};
export const create = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      tags: req.body.tags,
      imageUrl: req.body.imageUrl,
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
export const remove = async (req, res) => {
  try {
    const postId = req.params.id;
    await PostModel.findOneAndDelete({
      _id: postId,
    })
      .then((doc) => {
        if (!doc) {
          return res.status(404).json({
            message: "Не удалось найти статью",
          });
        }
        res.json({ success: true });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({
          message: "Не удалось удалить статью",
        });
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось удалить статью",
    });
  }
};
export const update = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
    const postId = req.params.id;
    await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags,
        user: req.userId,
      },
    );

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось обновить статью",
    });
  }
};
export const getTags = async (req, res) => {
  try {
    const posts = await PostModel.find().limit(5).exec();

    const tags = posts
      .map((obj) => obj.tags)
      .flat()
      .slice(0, 5);

    return res.json([...new Set(tags)]);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить теги",
    });
  }
};
