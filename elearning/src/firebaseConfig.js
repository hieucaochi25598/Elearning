import * as firebase from 'firebase'
var firebaseConfig = {
    apiKey: "AIzaSyB0skDWMIgUp1xhelzG3WnU9pqk5fYiej8",
    authDomain: "e-learning-6f173.firebaseapp.com",
    databaseURL: "https://e-learning-6f173.firebaseio.com",
    projectId: "e-learning-6f173",
    storageBucket: "e-learning-6f173.appspot.com",
    messagingSenderId: "334883228562",
    appId: "1:334883228562:web:38bdc78663b7c5b2be4f4b",
    measurementId: "G-XWSR3BKS6H"
  };
  // Initialize Firebase
export const firebaseApp = firebase.initializeApp(firebaseConfig);