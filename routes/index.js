import express from "express"
import { getDetails } from "../services/details.js"
import { addProject } from "../services/addProject.js"
const Router = express.Router()


Router.get("/",async(req,res)=>{
  await getDetails("babyo7_",res)
})

Router.post("/api/private",async(req,res)=>{
  const ps = req.query.ps
  if(!ps||ps!==process.env.PASSWORD)return res.status(403).json("unauthorized")
})


export{Router}
