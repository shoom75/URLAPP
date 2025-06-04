import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 
// Firebaseの設定情報（コンソールから取得）
const firebaseConfig = {
  apiKey: "AIzaSyD2Jei1fSM9ekyJ4SB5i2y-ck4EV3Pbubk",
  authDomain: "urlapp-7500d.firebaseapp.com",
  projectId: "urlapp-7500d",
  storageBucket: "urlapp-7500d.firebasestorage.app",
  messagingSenderId: "323267916128",
  appId: "1:323267916128:web:0dc4b327048a455dde6e05",
  measurementId: "G-QJ947H2CE0"
};

// Firebaseを初期化
const app = initializeApp(firebaseConfig);

// Firestoreのインスタンスを作成
const db = getFirestore(app);



// 他のファイルでも使えるようにエクスポート
export { db };