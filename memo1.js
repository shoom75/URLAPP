import { getFirestore, collection, addDoc } from "firebase/firestore";

const db = getFirestore();
const urlsRef = collection(db, "urls");

async function addUrl() {
  await addDoc(urlsRef, {
    url: "https://example.com",
    title: "Example Site",
    category: "Tech",
    createdAt: new Date(),
    userId: "user_123"
  });
}