import express from "express";
import dotenv from "dotenv";
import routes from "./routes/routes.js";
import { error_handler, not_fount } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import path from "path";

dotenv.config();

connectDB();

const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api", routes);

if (process.env.NODE_ENV === "production") {
  const dirName = path.resolve();
  app.use(express.static(path.join(dirName, "frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(dirName, "frontend", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => res.send("server is ready"));
}

app.use(not_fount);
app.use(error_handler);

app.listen(port, () => console.log(`Server started on port ${port}`));
