import { addDoc } from "firebase/firestore";
import { projectRef,getDetails } from "./details.js";

const addProject=async(username,title,link,desc,tech)=>{
    if(!link) return
    try {
        const user = await getDetails(username)
       
        const story = {
            user_id:user.id,
            title:title,
            link:link,
            desc:desc,
            tech:tech
        }
        
       await addDoc(projectRef,story)
       return
    } catch (error) {
        console.log(error.message);
    }
  
}

addProject("babyo7_")

export{addProject}