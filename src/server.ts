import express from "express";
import "reflect-metadata";

import upload from "./config/upload";
import routes from "./routes";

import "./database";

const app = express();
app.use(express.json());
app.use("/files", express.static(upload.directory));
app.use(routes);

app.listen(3333, () => {
  console.log("🚀 Server started on port 3333!");
});
