import express from "express";
import { getDetails } from "../services/details.js";
import { scrapeInstagramProfile } from "../Utils/insta-details.js";
import { addFormData } from "../services/addData.js";
const Router = express.Router();

Router.get("/", async (req, res) => {
  await getDetails("8pF4ORB0W4mKawW213Ig", res);
});

Router.get("/user/:name?", async (req, res) => {
  const user = req.params.name;
  if (!user) return res.status(402).json("username not provided");
  await getDetails(user, res);
});

Router.get("/details/:username", async (req, res) => {
  scrapeInstagramProfile(req.params.username, res);
});

Router.post("/submit", (req, res) => {
  addFormData(req.body, res);
});

export { Router };
