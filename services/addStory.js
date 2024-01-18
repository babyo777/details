import { addDoc } from "firebase/firestore";
import { storiesRef,getDetails } from "./details.js";

const addStory=async(username,link)=>{
    if(!link) return
    try {
        const user = await getDetails(username)
       
        const story = {
            user_id:user.id,
            link:link
        }
        
       await addDoc(storiesRef,story)
       return
    } catch (error) {
        console.log(error.message);
    }
  
}

addStory("babyo7_")

export{addStory}