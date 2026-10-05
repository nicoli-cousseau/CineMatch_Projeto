import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";
import { auth } from "./firebase.js";

const form = document.getElementById("loginForm");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("senha").value;

    try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        console.log("Usuário logado: ", result.user.uid);
        window.location.href = "./index.html";
    } catch (error) {
        console.error(error);
        document.getElementById("mensagem").textContent = "E-mail ou senha inválidos"; 
    }
});