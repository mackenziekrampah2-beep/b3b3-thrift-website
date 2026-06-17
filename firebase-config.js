// Import Firebase v10
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";

// Your config - already correct
const firebaseConfig = {
  apiKey: "AIzaSyCbJiGfWoTlGNlGMoHxnYQaAoz613uOnPQ",
  authDomain: "b3b3-s-thrift.firebaseapp.com",
  projectId: "b3b3-s-thrift",
  storageBucket: "b3b3-s-thrift.firebasestorage.app",
  messagingSenderId: "724813980343",
  appId: "1:724813980343:web:da3e5bd83ab5eb371ae332",
  measurementId: "G-HPYHETPRLW"
};

// Initialize only once
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export for other files
export const auth = getAuth(app);
export const db = getFirestore(app);