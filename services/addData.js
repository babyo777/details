import { ContactRef, firebaseAdmin ,admin} from "./adminfirebase.js";

const addFormData = async (data, res) => {
  const user = await firebaseAdmin.auth().verifyIdToken(data.token);
  if (!user.email_verified) throw new Error("access denied");
  try {
    if (Object.keys(data).length == 0) throw new Error("data is empty");
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
