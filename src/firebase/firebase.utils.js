import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDGpNHV4Ruw6326_is-_pcrf9KmEJMQNpU",
    authDomain: "crwn-db-7e44c.firebaseapp.com",
    databaseURL: "https://crwn-db-7e44c.firebaseio.com",
    projectId: "crwn-db-7e44c",
    storageBucket: "crwn-db-7e44c.appspot.com",
    messagingSenderId: "86675894793",
    appId: "1:86675894793:web:d9d963cf1f34f206"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});

export const signInWithGoogle = () => {
    auth.signInWithPopup(provider);
}

export default firebase;