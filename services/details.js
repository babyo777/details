import { db } from "../Utils/firebase-config.js";
import fs from "fs"
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";

const detailsRef = collection(db, "details");
const projectRef = collection(db, "projects");
const friendsRef = collection(db, "friends");
const ContactRef = collection(db, "contact");

const getDetails = async (username, res) => {
  try {
    const userRef = doc(detailsRef, username);
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists()) throw new Error("user not exists");
    const projects = query(projectRef, where("ref", "==", userRef));
    const ProjectsData = (await getDocs(projects)).docs.map((doc) => {
      const project = doc.data();
      const { ref, ...data } = project;
      return data;
    });
    const friends = query(friendsRef, where("ref", "==", userRef));
    const friendsData = (await getDocs(friends)).docs.map((friend) => {
      const friendsList = friend.data();
      const { ref, friends } = friendsList;
      return friends;
    });
    const userData = {
      id: userDoc.id,
      ...userDoc.data(),
      projects: ProjectsData,
      friends: friendsData.flat(),
    };
    res.status(200).json(userData);
  } catch (err) {
    fs.appendFileSync("./reports/report.txt",new Date().toLocaleString("en-IN") + " " + "error:-" + " " + err.message + "\n" )
    res.status(500).json(err.message);
  }
};

export { projectRef, detailsRef, getDetails, ContactRef };
