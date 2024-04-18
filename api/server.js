import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import postRoute from "./routes/postRoute.js";
import authRoute from "./routes/authRoute.js";
import testRoute from "./routes/test.route.js"
const app = express();
app.use(cors({origin: 'http://127.0.0.1:5173',credentials: true}));
app.use(express.json());
app.use(cookieParser());
app.use("/api/posts", postRoute);
app.use("/api/test", testRoute);
app.listen(4000, () => {
  console.log("server is running");
});
