import { onAuthStateChanged, singOut } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";
import { auth } from "./firebase.js";

console.log("Firebase inicializado");
console.log(auth);

onAuthStateChanged (auth, (user) => {
    if (!user){
window.location.href = "./login.html";
return;
    }
});

document
    .getElementById("logout")
    .addEventListener("click", async () => {
        await singOut(auth);
            window.location.href = "./login.html";
    })