import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBjXLqbo3dq-48PcbIRGRcrfev_EAt_-HA",
  authDomain: "flores-5b9ca.firebaseapp.com",
  projectId: "flores-5b9ca",
  storageBucket: "flores-5b9ca.firebasestorage.app",
  messagingSenderId: "671873530932",
  appId: "1:671873530932:web:e540b4b95ce52dedfe5e61"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

