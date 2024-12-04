import express from "express";
import userRoute from "@/routes/user.route";
import authRoute from "@/routes/auth.route";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Express + TypeScript Server!");
});

app.use("/users", userRoute);
app.use("/auth", authRoute);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
