import {initializeApp} from 'firebase/app'
import { getAuth} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyAPQ_Xw6RxLmQutyTjuJCoQgUDwuWJYmlg",
    authDomain: "fir-react-bda0c.firebaseapp.com",
    projectId: "fir-react-bda0c",
    storageBucket: "fir-react-bda0c.appspot.com",
    messagingSenderId: "409284725895",
    appId: "1:409284725895:web:8984ec7ee346da1e627c22"
  };


  

const app = initializeApp(firebaseConfig)

export const auth= getAuth(app)

export const db= getFirestore(app)
export const firestore = getFirestore(app);