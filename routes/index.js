import express from "express"
import { getDetails } from "../services/details.js"
import { addStory } from "../services/addStory.js"
const Router = express.Router()


Router.get("/",async(req,res)=>{
res.status(200).json(await getDetails("babyo7_"))
})

Router.get("/api/private",async(req,res)=>{
  const ps = req.query.ps
  if(ps!==process.env.PASSWORD)return res.status(403).json("unauthorized")
  res.status(200).json("new story added")
})


export{Router}
