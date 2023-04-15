import { v2 as cloudinary } from "cloudinary";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";
import { PostSchema } from "../modals/post.js";

cloudinary?.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

dotenv.config();

const config = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});

const openAi = new OpenAIApi(config);

export const postController = {
  /* 
  Method: POST
  type: open
  route: api/v1/post
  */
  add: async (req, res, next) => {
    try {
      const { name, prompt, photo } = req.body;
      const photoUrl = await cloudinary.uploader.upload(photo);

      const newPost = await PostSchema.create({
        name,
        prompt,
        photo: photoUrl.url,
      });

      res.status(201).json({
        success: true,
        data: newPost,
        message: "Post added",
      });
    } catch (error) {
      next(error);
    }
  },
  /* 
  Method: GET
  type: Open
  route: api/v1/post
  */
  get: async (req, res, next) => {
    try {
      const posts = await PostSchema.find();
      res.status(200).json({
        success: true,
        data: posts,
        message: "Posts fetched",
      });
    } catch (error) {
      next(error);
    }
  },
};
