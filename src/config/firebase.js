// Firebase yapılandırma dosyası
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBOZSODba5TzzH7o-x8xIq8mUidCEj9nkE",
    authDomain: "dashboard-advoard-agv.firebaseapp.com",
    databaseURL: "https://dashboard-advoard-agv-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "dashboard-advoard-agv",
    storageBucket: "dashboard-advoard-agv.firebasestorage.app",
    messagingSenderId: "1030942573221",
    appId: "1:1030942573221:web:0a21eb4a8324be36fd034c"
};

// Firebase uygulamasını başlat
const app = initializeApp(firebaseConfig);

// Firebase servislerini dışa aktar
export const auth = getAuth(app);
export const database = getDatabase(app);
export default app;
