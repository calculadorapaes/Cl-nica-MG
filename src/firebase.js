import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Placeholder Firebase configuration
// In a real scenario, these would be populated with the actual project details.
const firebaseConfig = {
  apiKey: "DEMO_API_KEY",
  authDomain: "demo-clinica-mg.firebaseapp.com",
  projectId: "demo-clinica-mg",
  storageBucket: "demo-clinica-mg.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
