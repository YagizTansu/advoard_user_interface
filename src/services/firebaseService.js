// Firebase işlemleri için servis sınıfı
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged 
} from "firebase/auth";
import {
  ref,
  set,
  get,
  update,
  remove,
  push,
  child,
  query,
  orderByChild,
  equalTo,
  onValue,
  off
} from "firebase/database";
import { auth, database } from "../config/firebase";

// Kimlik doğrulama işlemleri
export const authService = {
  // Kullanıcı kaydı
  register: (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  },
  
  // Kullanıcı girişi
  login: (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  },
  
  // Kullanıcı çıkışı
  logout: () => {
    return signOut(auth);
  },
  
  // Oturum durumu değişikliklerini dinleme
  onAuthChange: (callback) => {
    return onAuthStateChanged(auth, callback);
  },
  
  // Mevcut kullanıcıyı alma
  getCurrentUser: () => {
    return auth.currentUser;
  }
};

// Realtime Database işlemleri
export const dbService = {
  // Veri oluşturma - belirli bir id ile
  setData: (path, data) => {
    return set(ref(database, path), data);
  },
  
  // Veri oluşturma - otomatik id ile
  pushData: async (path, data) => {
    const newRef = push(ref(database, path));
    await set(newRef, data);
    return newRef.key;
  },
  setDataWithId: (path, id, data) => {
    const itemRef = ref(database, `${path}/${id}`);
    return set(itemRef, data);
  },
  // Veri okuma - bir kez
  getData: async (path) => {
    const snapshot = await get(ref(database, path));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return null;
    }
  },
  
  // Veri okuma - gerçek zamanlı dinleme
  onDataChange: (path, callback) => {
    const dataRef = ref(database, path);
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      callback(data);
    });
    
    // Dinlemeyi durdurmak için kullanılacak referansı döndür
    return dataRef;
  },
  
  // Dinlemeyi durdurma
  offDataChange: (reference) => {
    off(reference);
  },
  
  // Veri güncelleme
  updateData: (path, data) => {
    return update(ref(database, path), data);
  },
  
  // Veri silme
  removeData: (path) => {
    return remove(ref(database, path));
  },
  
  // Sorgu yapma
  queryData: (path, field, value) => {
    const queryRef = query(ref(database, path), orderByChild(field), equalTo(value));
    return get(queryRef).then(snapshot => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        return null;
      }
    });
  }
};
