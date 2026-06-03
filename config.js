// config.js - חיבור למערכת הנתונים
const firebaseConfig = {
    databaseURL: "https://artflow-74b9c-default-rtdb.firebaseio.com/"
};

// אתחול המערכת
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// ייצוא החיבור לשימוש בשאר הקבצים
window.db = db;
