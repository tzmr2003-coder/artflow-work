// ui.js - הממשק והעיצוב
window.ui = {
    initDashboard: () => {
        const main = document.getElementById('main-content');
        main.innerHTML = `
            <div class="mb-10 text-center">
                <div class="text-xs uppercase text-slate-500 tracking-[0.4em]">מערכת ניהול</div>
                <h1 class="text-5xl font-black text-white mt-1">ARTFLOW_PRO</h1>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                <button class="p-6 rounded-3xl glass-panel text-center hover:border-gold transition-all">
                    <div class="text-4xl mb-4">🏗️</div>
                    <div class="font-bold">פרויקטים</div>
                </button>
                <button class="p-6 rounded-3xl glass-panel text-center hover:border-gold transition-all">
                    <div class="text-4xl mb-4">👷</div>
                    <div class="font-bold">נוכחות</div>
                </button>
                <button class="p-6 rounded-3xl glass-panel text-center hover:border-gold transition-all">
                    <div class="text-4xl mb-4">💰</div>
                    <div class="font-bold">כספים</div>
                </button>
                <button class="p-6 rounded-3xl glass-panel text-center hover:border-gold transition-all">
                    <div class="text-4xl mb-4">📍</div>
                    <div class="font-bold">ניווט</div>
                </button>
            </div>
            
            <div id="view-area" class="glass-panel p-8 rounded-3xl">
                ברוך הבא למערכת. בחר נושא מהתפריט למעלה.
            </div>
        `;
    }
};

// הפעלה ראשונית
document.addEventListener('DOMContentLoaded', () => {
    window.ui.initDashboard();
});
