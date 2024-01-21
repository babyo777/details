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
  addProject("babyo7_","omegle-clone","https://omegle-7.onrender.com","same as omegle",["peer-js","tailwind-css","socket.io","html"]).then(()=>{
res.status(200).json("new project added")
})
})


export{Router}
