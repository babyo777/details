import { db } from "../Utils/firebase-config.js";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const projectRef = collection(db, "projects");
const detailsRef = collection(db, "details");
const friendsRef = collection(db, "friends");

const getDetails = async (username, res) => {
  try {
    const userRef = doc(detailsRef, "8pF4ORB0W4mKawW213Ig");
    const userDoc = await getDoc(userRef)
    if(!userDoc.exists) throw new Error("user not exists")
    const projects = query(projectRef, where("ref", "==", userRef));
    const ProjectsData = (await getDocs(projects)).docs.map((doc) => {
      const project = doc.data();
      const { ref, user_id, ...data } = project;
      return data;
    });
    const friends = query(friendsRef, where("ref", "==", userRef));
    const friendsData = (await getDocs(friends)).docs.map((friend) => {
      const friendsList = friend.data();
      const { ref,friends } = friendsList;
      return friends;
    });
    const userData = {
      id: userDoc.id,
      ...userDoc.data(),
      projects: ProjectsData,
      friends:friendsData.flat()
    };
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

export { projectRef, detailsRef, getDetails };
