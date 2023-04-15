import express from "express";
import { dalleController } from "../controller/dalleController.js";

const dalleRouter = express.Router();

dalleRouter.route("/").post(dalleController.generate);

export default dalleRouter;
