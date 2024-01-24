import { config } from "../firebaseAdmin.js";
import admin from "firebase-admin";
import {getFirestore} from "firebase-admin/firestore";
const firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(config),
});
const fst = getFirestore()
const ContactRef = fst.collection("contact");

export { ContactRef, firebaseAdmin,admin };
