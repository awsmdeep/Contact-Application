import express from "express";
import dotenv from "dotenv";
import router from "./routes/contact.route.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { connectDb } from "./config/dbConnection.js";
dotenv.config();
connectDb();

const app = express();


const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/contacts", router);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`listening at port ${port}`);
});
