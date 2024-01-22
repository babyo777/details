import express from "express";
import { getDetails } from "../services/details.js";
import { scrapeInstagramProfile } from "../Utils/insta-details.js";
const Router = express.Router();

Router.get("/", async (req, res) => {
  await getDetails("babyo7_",res);
});

Router.get("/user/:name?", async (req, res) => {
  const user = req.params.name 
  if(!user) return res.status(402).json("username not provided")
  await getDetails(user,res);
});

Router.get("/details/:username", async (req, res) => {
  scrapeInstagramProfile(req.params.username, res);
});

export { Router };
