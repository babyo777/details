import { db } from "../Utils/firebase-config.js";
import { collection, getDocs, query, where } from "firebase/firestore";

const detailsRef = collection(db, "details");
const projectRef = collection(db, "projects");

const getDetails = async (username) => {
  try {
    const queryString = query(detailsRef, where("username", "==", username));
    const querySnapshot = await getDocs(queryString);
    if(querySnapshot.empty) throw new Error("user not found")
    const userDoc = querySnapshot.docs[0];
  const Projects = await getDocs(query(projectRef, where("user_id", "==", userDoc.id)))
 const ProjectsData = Projects.docs.map(doc=>doc.data())
    const userData = { id: userDoc.id, ...userDoc.data() ,projects:ProjectsData  };
    return userData;
  } catch (err) {
    console.log(err.message);
  }
};

export { projectRef, detailsRef, getDetails };
