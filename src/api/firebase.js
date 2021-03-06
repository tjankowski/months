// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
// import "firebase/analytics";

// Add the Firebase products that you want to use
// import "firebase/auth";
// import "firebase/firestore";
import "firebase/database";
import "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
import config from "./config.confidential";

// Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// const database = firebase.database();

firebase.initializeApp(config);
const database = firebase.firestore();


export default database;
