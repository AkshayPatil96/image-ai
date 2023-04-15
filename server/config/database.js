import mongoose from "mongoose";

export const connectDB = (url) => {
  mongoose.set("strictQuery", true);

  mongoose
    .connect(url)
    .then(() => console.log("Database Connected"))
    .catch((err) => console.log(err));
};
