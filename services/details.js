import { db } from "../Utils/firebase-config.js";
import { collection, getDocs, query, where } from "firebase/firestore";

const detailsRef = collection(db, "details");
const storiesRef = collection(db, "stories");

const getDetails = async (username) => {
  try {
    const queryString = query(detailsRef, where("username", "==", username));
    const querySnapshot = await getDocs(queryString);
    if(querySnapshot.empty) throw new Error("user not found")
    const userDoc = querySnapshot.docs[0];
    const stories = await getDocs(query(storiesRef,where("user_id","==",userDoc.id)))
    const storiesData = stories.docs.map(stories=>({id:stories.id,link:stories.get("link")}))
    const userData = { id: userDoc.id, ...userDoc.data() , story: storiesData };
    return userData;
  } catch (err) {
    console.log(err.message);
  }
};

export { storiesRef, detailsRef, getDetails };
