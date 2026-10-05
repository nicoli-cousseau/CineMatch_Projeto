// Firebase via CDN (sem npm/Vite). Cole abaixo a config do seu projeto:
// Console do Firebase > Configurações do projeto > Seus apps > App da Web.
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword,
  signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, doc, setDoc, collection, onSnapshot, serverTimestamp }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDQPjM-j0cfY5J6D6s08uM_m7wbwA32sCI",
    authDomain: "cinematch-11.firebaseapp.com",
    projectId: "cinematch-11",
    appId: "1:246700160995:web:4fe2e27732e6eae502d2d6",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);

export { onAuthStateChanged };
export const signUp = (email, pw) => createUserWithEmailAndPassword(auth, email, pw);
export const signIn = (email, pw) => signInWithEmailAndPassword(auth, email, pw);
export const logOut = () => signOut(auth);

// users/{uid}/filmes/{imdbID} -> { titulo, ano, poster, lista: bool, nota: 0-5 }
// Guardamos título/ano/pôster para montar "Minha lista" sem chamar a OMDb de novo.
export const saveMovie = (uid, m, patch) =>
  setDoc(doc(db, "users", uid, "filmes", m.id),
    { titulo: m.titulo, ano: m.ano, poster: m.poster, ...patch, updatedAt: serverTimestamp() },
    { merge: true });

export const watchMovies = (uid, cb) =>
  onSnapshot(collection(db, "users", uid, "filmes"), (snap) => {
    const map = {};
    snap.forEach((d) => (map[d.id] = d.data()));
    cb(map);
  });