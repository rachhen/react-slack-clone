import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

var config = {
    apiKey: "AIzaSyADiAfMbKM6AB9O16kTHClBIdJYww96amg",
    authDomain: "react-slack-clone-c87b4.firebaseapp.com",
    databaseURL: "https://react-slack-clone-c87b4.firebaseio.com",
    projectId: "react-slack-clone-c87b4",
    storageBucket: "react-slack-clone-c87b4.appspot.com",
    messagingSenderId: "259336902589"
};
firebase.initializeApp(config);

export default firebase;
