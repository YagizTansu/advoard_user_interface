// // Firebase yapılandırma dosyası
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getDatabase } from "firebase/database";

// const firebaseConfig = {
//     apiKey: "AIzaSyBOZSODba5TzzH7o-x8xIq8mUidCEj9nkE",
//     authDomain: "dashboard-advoard-agv.firebaseapp.com",
//     databaseURL: "https://dashboard-advoard-agv-default-rtdb.europe-west1.firebasedatabase.app",
//     projectId: "dashboard-advoard-agv",
//     storageBucket: "dashboard-advoard-agv.firebasestorage.app",
//     messagingSenderId: "1030942573221",
//     appId: "1:1030942573221:web:0a21eb4a8324be36fd034c"
// };

// // Firebase uygulamasını başlat
// const app = initializeApp(firebaseConfig);

// // Firebase servislerini dışa aktar
// export const auth = getAuth(app);
// export const database = getDatabase(app);
// export default app;




// Firebase yapılandırma dosyası
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getDatabase, connectDatabaseEmulator } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAQ4dVBsy5OaeaQmG958V6Y3M2oMGiSbtk",
    authDomain: "dashboard-advoard-agv.firebaseapp.com",
    databaseURL: "http://172.16.30.225:9000",
    projectId: "totemic-fulcrum-152900",
    storageBucket: "dashboard-advoard-agv.firebasestorage.app",
    messagingSenderId: "1030942573221",
    appId: "1:1030942573221:web:0a21eb4a8324be36fd034c"
};

// Firebase uygulamasını başlat
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const database = getDatabase(app);

connectAuthEmulator(auth, "http://172.16.30.225:9099")  
connectDatabaseEmulator(database, "172.16.30.225", 9000)  

// Firebase servislerini dışa aktar
export {auth, database};
export default app;


// var firebaseConfig = { 
//     apiKey: 'AIzaSyAQ4dVBsy5OaeaQmG958V6Y3M2oMGiSbtk',
//     databaseURL: 'http://172.16.30.225:9000',
//     projectId: 'totemic-fulcrum-152900'
// };

// firebase.initializeApp(firebaseConfig);

// firebase.auth().useEmulator('http://172.16.30.225:9099');
