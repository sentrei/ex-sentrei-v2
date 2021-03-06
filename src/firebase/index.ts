import firebase from "firebase/app";

import {isProduction} from "@/utils/env";

firebase.setLogLevel(isProduction ? "silent" : "info");

const betaConfig = {
  apiKey: "AIzaSyAAW-quTzZOZjkm2tyzQMoWacKN9x9-s6A",
  appId: "1:258612152633:web:1fd7236c0410da67ff40e8",
  authDomain: "sentrei-beta.firebaseapp.com",
  databaseURL: "https://sentrei-beta.firebaseio.com",
  measurementId: "G-S1CCQTFCVT",
  messagingSenderId: "258612152633",
  projectId: "sentrei-beta",
  storageBucket: "sentrei-beta.appspot.com",
};

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY as string,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID as string,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN as string,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL as string,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID as string,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_ID as string,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET as string,
};

if (!firebase.apps.length) {
  firebase.initializeApp(
    process.env.VERCEL_GITHUB_COMMIT_REF === "main"
      ? firebaseConfig
      : betaConfig,
  );
}

export default firebase;
