import { collection, getDocs } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js"
import { db } from "./firebase.js";

async function quickstartListen(db) {
    // [START firestore_setup_dataset_read]
    // const snapshot = await db.collection('users').get();
    const snapshot = await getDocs(collection(db, 'users'));
    snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
    });
    // [END firestore_setup_dataset_read]
}

quickstartListen(db)