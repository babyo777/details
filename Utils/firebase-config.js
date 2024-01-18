
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import { configDotenv } from "dotenv";
configDotenv()

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY ,
  authDomain: "napster-2f2b4.firebaseapp.com",
  projectId: "napster-2f2b4",
  storageBucket: "napster-2f2b4.appspot.com",
  messagingSenderId: "395432877822",
  appId: process.env.FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export{db}