import { db } from "../Utils/firebase-config.js";
import { collection, getDocs, query, where } from "firebase/firestore";

const detailsRef = collection(db, "details");
const projectRef = collection(db, "prjects");

const getDetails = async (username,res) => {
  try {
    const queryString = query(detailsRef, where("username", "==", username));
    const querySnapshot = await getDocs(queryString);
    if(querySnapshot.empty) throw new Error("user not found")
    const userDoc = querySnapshot.docs[0];
  const Projects = await getDocs(query(projectRef, where("user_id", "==", userDoc.id)))
 const ProjectsData = Projects.docs.map(doc=>doc.data())
    const userData = { id: userDoc.id, ...userDoc.data() ,projects:ProjectsData  };
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err.message)
    console.log(err.message);
  }
};

export { projectRef, detailsRef, getDetails };
