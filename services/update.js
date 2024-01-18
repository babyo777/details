import { doc, updateDoc} from "firebase/firestore"
import {detailsRef,getDetails} from  "./details.js"


const updateUser = async(username,newData)=>{
    try {
    const user = await getDetails(username)
    const userDoc = doc(detailsRef,user.id)
    const update = await updateDoc(userDoc,newData)  
    return 
    } catch (error) {
        console.log(error.message);
    }      
}


export {updateUser}