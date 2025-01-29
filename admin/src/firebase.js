// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAotC0bg1V7z4zS-8tiunYW0R32B7_tNwk",
  authDomain: "shop-4d87c.firebaseapp.com",
  projectId: "shop-4d87c",
  storageBucket: "shop-4d87c.appspot.com",
  messagingSenderId: "299849282046",
  appId: "1:299849282046:web:089b7bb8d3c05ee1d990af"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export default storage;