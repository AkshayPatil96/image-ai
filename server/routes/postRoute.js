import express from "express";
import { postController } from "../controller/postController.js";
// const express = require("express");

const postRouter = express.Router();

postRouter.route("/").get(postController.get);
postRouter.route("/").post(postController.add);

export default postRouter;
