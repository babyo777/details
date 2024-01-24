import { ContactRef, firebaseAdmin ,admin} from "./adminfirebase.js";

const addFormData = async (data, res) => {
  if(!data.token) return res.status(402).json("Token not provided");
  const user = await firebaseAdmin.auth().verifyIdToken(data.token);
  try {
    if (!user.email_verified) throw new Error("invalid token");
    if (Object.keys(data).length == 0) throw new Error("Fields is empty");
    const {token,...rest} =data
    const newData = { ...rest, date:admin.firestore.FieldValue.serverTimestamp() };
    ContactRef.add(newData)
    res.status(200).json("success");
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

export { addFormData };
