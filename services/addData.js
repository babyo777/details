import { ContactRef, firebaseAdmin ,admin} from "./adminfirebase.js";

const addFormData = async (data, res) => {
  if(!data.token) return res.status(402).json("Token not provided");
  try {
    const user = await firebaseAdmin.auth().verifyIdToken(data.token);
    if (!user.email_verified) return  res.status(403).json("access denied");
    if (Object.keys(data).length == 0) return res.status(402).json("Fields is empty");
    const {token,...rest} =data
    const newData = { ...rest, date:admin.firestore.FieldValue.serverTimestamp() };
    ContactRef.add(newData)
    res.status(200).json("success");
  } catch (error) {
    if (error.code === "auth/argument-error") {
      return res.status(403).json("Access denied - Token not found");
    }
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

export { addFormData };
