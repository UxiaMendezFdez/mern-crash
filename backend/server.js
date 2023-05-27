import express from "express";
import dotenv from "dotenv";
import routes from "./routes/routes.js";
import { error_handler, not_fount } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);
app.use(not_fount);
app.use(error_handler);

app.get("/", (req, res) => res.send("server is ready"));

app.listen(port, () => console.log(`Server started on port ${port}`));
