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

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });

        } catch (error) {
            console.log('Error creating user', error.message);
        }
    }

    return userRef;    
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});

export const signInWithGoogle = () => {
    auth.signInWithPopup(provider);
}

export default firebase;