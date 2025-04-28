import { initializeApp } from 'firebase/app'; 
import { onAuthStateChanged, getAuth } from 'firebase/auth'; 
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from 'firebase/app-check'
import { getFirestore } from 'firebase/firestore'

const config = {
    apiKey: "AIzaSyAHSF2tc71BuMiZbdAC5Yw2kZz1LX61yLE",
    authDomain: "resumeai-2fc2a.firebaseapp.com",
    projectId: "resumeai-2fc2a",
    storageBucket: "resumeai-2fc2a.firebasestorage.app",
    messagingSenderId: "152728544431",
    appId: "1:152728544431:web:1bac8097c7f1551de2e05a",
    measurementId: "G-ZCRJFZRSXP"
}

const app = initializeApp(config)

const appcheck = initializeAppCheck(app, {
    provider: new ReCaptchaEnterpriseProvider("6LeWRSYrAAAAAO3nH74Ms72_AU8abWtfBXvdsAE-"), 
    isTokenAutoRefreshEnabled: true
})

const auth = getAuth(app)

const firestore = getFirestore(app); 

onAuthStateChanged(auth, (user) => {
    if(user == null){
        console.log("user, not found")
    }else{
        console.log("user logged in")
    }
})