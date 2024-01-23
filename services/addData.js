import { ContactRef } from "./details.js";
import { addDoc, serverTimestamp } from "firebase/firestore";

const addFormData = async (data, res) => {
  try {
    if(Object.keys(data).length == 0) throw new Error("data is empty")
    const newData = {...data,date:serverTimestamp()}
    await addDoc(ContactRef, newData);
    res.status(200).json("success");
  } catch (error) {
    res.status(500).json(error.message);
  }
};



export { addFormData };
