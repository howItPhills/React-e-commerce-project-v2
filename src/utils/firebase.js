import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  writeBatch,
  collection,
  query,
  getDocs,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA2RZiRHWYbIEt2Pzh5wswNX00pwZDgPcI",
  authDomain: "my-e-commerce-8e859.firebaseapp.com",
  projectId: "my-e-commerce-8e859",
  storageBucket: "my-e-commerce-8e859.appspot.com",
  messagingSenderId: "453412794223",
  appId: "1:453412794223:web:9a4834a3ce2dcd43b3c29a",
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

// Auth object
export const auth = getAuth();

// Sign-in with google function
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

//Working with firebase db
export const db = getFirestore();

//Adding new collection to firestore database
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const batch = writeBatch(db);
  const collectionRef = collection(db, collectionKey);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done");
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoryMap;
};

//Creating signed user document in firebase db
export const createUserDocument = async (userAuth, additionalData) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    //creating user document if it still not exists in firebase db
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      debugger;
      await setDoc(userDocRef, {
        displayName,
        createdAt,
        email,
        ...additionalData,
      });
    } catch (error) {
      alert("Failed", error.message);
    }
  }
};

export const createUserAuthWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};
export const signOutUser = async () => {
  await signOut(auth);
};

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
