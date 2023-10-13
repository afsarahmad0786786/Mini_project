import { defineStore } from "pinia";
import { auth } from "../js/firebase";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "firebase/auth";
import {useStoreNotes} from './storeNotes'

export const useStoreAuth = defineStore("storeAuth", {
  state: () => {
    return {
      user :  {}

    };
  },
  actions: {
    init() {
      const storeNotes = useStoreNotes()
      
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log(user)
          this.user.id = user.uid;
          this.user.email = user.email
          //this.user.password = user.password
          this.router.push('/notes')
          storeNotes.init()
        } else {
       this.user = {}
      this.router.replace('/')
       storeNotes.clearNotes()
        }
      });
    },
    registerUser(email, password) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
    },
    login(credentials) {
      signInWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    },
    logout() {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
        })
        .catch((error) => {
          // An error happened.
        });
    },
  },
});
