import { ContactRef } from "./details.js";
import { addDoc, serverTimestamp } from "firebase/firestore";

const addFormData = async (data, res) => {
  if(isFieldBlank(data.name)||isFieldBlank(data.email)||isFieldBlank(data.phone)) return   res.status(400).json("All fields required");
  try {
    const newData = {...data,date:serverTimestamp()}
    await addDoc(ContactRef, newData);
    res.status(200).json("success");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

function isFieldBlank(value) {
  return typeof value !== 'string' || value.trim() === '';
}

export { addFormData };
