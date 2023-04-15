import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";
import { PostSchema } from "../modals/post.js";

dotenv.config();

const config = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});

const openAi = new OpenAIApi(config);

export const dalleController = {
  generate: async (req, res, next) => {
    try {
      const { prompt } = req.body;
      const aiResponse = await openAi.createImage({
        prompt,
        n: 1,
        size: "1024x1024",
        response_format: "b64_json",
      });

      const image = aiResponse?.data?.data?.[0]?.b64_json;

      res.status(200).json({
        photo: image,
      });
    } catch (error) {
      next(error);
    }
  },
};
