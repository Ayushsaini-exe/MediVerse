
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

let app: FirebaseApp;
let auth: Auth;

if (firebaseConfig.apiKey) {
    if (!getApps().length) {
        app = initializeApp(firebaseConfig);
        console.log("Firebase initialized successfully.");
    } else {
        app = getApp();
        console.log("Firebase app already initialized.");
    }
    auth = getAuth(app);
} else {
    console.error("Firebase configuration is missing or incomplete. Please check your .env file and ensure it is prefixed with NEXT_PUBLIC_ and that the development server was restarted.");
    // Provide non-functional placeholders to prevent crashing the app on the server.
    app = {} as FirebaseApp;
    auth = {} as Auth;
}


export { app, auth };
