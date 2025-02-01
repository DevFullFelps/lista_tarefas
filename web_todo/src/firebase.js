import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, push } from "firebase/database";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"; // Importe a função signOut

const firebaseConfig = {
    apiKey: "AIzaSyA2sm-XR_OgPY_SRWr0a5hhlUcovM0ZFDE",
    authDomain: "bd-td-list.firebaseapp.com",
    databaseURL: "https://bd-td-list-default-rtdb.firebaseio.com",
    projectId: "bd-td-list",
    storageBucket: "bd-td-list.firebasestorage.app",
    messagingSenderId: "419707199929",
    appId: "1:419707199929:web:9638351c9a3d8124151668",
    measurementId: "G-5LGBJGRP44"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o Realtime Database
const database = getDatabase(app);

// Inicializa o módulo de autenticação
const auth = getAuth(app); // Inicializa o auth
const googleProvider = new GoogleAuthProvider(); // Provedor de autenticação do Google

// Exporta as funções e variáveis necessárias
export { database, ref, set, onValue, push, auth, googleProvider, signInWithPopup, signOut }; // Agora inclui signOut
