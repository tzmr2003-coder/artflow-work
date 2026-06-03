import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_ID",
    appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

window.app = {
    renderView: async (view) => {
        const titleEl = document.getElementById('view-title');
        const grid = document.getElementById('grid-layout');
        const views = { dashboard: "לוח בקרה ראשי", projects: "ניהול פרויקטים", finance: "ניהול כספים" };
        
        titleEl.innerText = views[view] || "מערכת ניהול";
        grid.innerHTML = `<div class="col-span-full text-center py-20 animate-pulse">טוען נתונים...</div>`;
        
        try {
            if (view === 'dashboard') {
                grid.innerHTML = `
                    <div class="glass-panel p-6 rounded-2xl border-l-4 border-blue-500">
                        <div class="text-sm opacity-50 uppercase">פרויקטים פעילים</div>
                        <div class="text-4xl font-black mt-2">12</div>
                    </div>`;
            } else {
                const q = query(collection(db, view), orderBy("createdAt", "desc"));
                const snapshot = await getDocs(q);
                grid.innerHTML = snapshot.docs.length > 0 
                    ? snapshot.docs.map(doc => `
                        <div class="glass-panel p-6 rounded-2xl border border-white/10 hover:border-blue-500/50 transition-all">
                            <h3 class="font-bold text-lg">${doc.data().title || 'ללא כותרת'}</h3>
                            <p class="text-sm opacity-60 mt-2">${doc.data().description || ''}</p>
                        </div>`).join('')
                    : `<div class="col-span-full text-center p-10 glass-panel rounded-2xl">אין נתונים להצגה</div>`;
            }
        } catch (e) {
            grid.innerHTML = `<div class="text-red-500 col-span-full text-center">שגיאה בטעינת הנתונים: ${e.message}</div>`;
        }
    }
};

setInterval(() => {
    const clock = document.getElementById('system-clock');
    if(clock) clock.innerText = new Date().toLocaleTimeString('he-IL');
}, 1000);
