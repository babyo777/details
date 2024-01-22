import { ContactRef } from "./details.js";
import { addDoc } from "firebase/firestore";

const addFormData = async (data, res) => {
  try {
    await addDoc(ContactRef, data);
    res.status(200).json("success");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export { addFormData };
