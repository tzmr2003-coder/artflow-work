// ARTFLOW ENTERPRISE - UI ENGINE - V3.0
// COMPLETE SYSTEM INTERFACE WITH MULTI-MODULE INTEGRATION

window.ui = {
    // רינדור המבנה הבסיסי והתפריט הראשי של האפליקציה
    render: () => {
        const root = document.getElementById('main-content');
        root.innerHTML = `
            <div class="space-y-6 max-w-2xl mx-auto pb-16">
                
                <div class="grid grid-cols-4 gap-2 mb-4">
                    <button id="btn-tab-projects" onclick="ui.switchTab('projects')" class="p-3 rounded-2xl glass-panel text-center border-gold/20 transition-all duration-200">
                        <div class="text-xl mb-1">🏗️</div>
                        <div class="text-[10px] font-bold text-slate-300">פרויקטים</div>
                    </button>
                    <button id="btn-tab-attendance" onclick="ui.switchTab('attendance')" class="p-3 rounded-2xl glass-panel text-center border-gold/20 transition-all duration-200">
                        <div class="text-xl mb-1">👷</div>
                        <div class="text-[10px] font-bold text-slate-300">נוכחות</div>
                    </button>
                    <button id="btn-tab-finance" onclick="ui.switchTab('finance')" class="p-3 rounded-2xl glass-panel text-center border-gold/20 transition-all duration-200">
                        <div class="text-xl mb-1">💰</div>
                        <div class="text-[10px] font-bold text-slate-300">כספים</div>
                    </button>
                    <button id="btn-tab-navigation" onclick="ui.switchTab('navigation')" class="p-3 rounded-2xl glass-panel text-center border-gold/20 transition-all duration-200">
                        <div class="text-xl mb-1">📍</div>
                        <div class="text-[10px] font-bold text-slate-300">ניווט</div>
                    </button>
                </div>

                <div id="dynamic-view" class="space-y-6 min-h-[300px]"></div>

                <div class="glass-panel p-5 rounded-3xl border border-emerald-500/20 shadow-xl mt-6">
                    <div class="flex justify-between items-center mb-3">
                        <h4 class="text-xs font-bold text-emerald-400 uppercase tracking-wider">סטטוס פעימות מערכת</h4>
                        <span class="text-[10px] bg-emerald-500/10 text-emerald-400 px-2.5 py-0.5 rounded-full font-bold">סנכרון פעיל</span>
                    </div>
                    <div class="grid grid-cols-2 gap-3 text-center">
                        <div class="bg-slate-900/60 p-4 rounded-2xl border border-slate-800/80">
                            <div class="text-[11px] text-slate-400 mb-0.5">פרויקטים פעילים</div>
                            <div id="stats-active-projects" class="text-xl font-black text-white">0</div>
                        </div>
                        <div class="bg-slate-900/60 p-4 rounded-2xl border border-slate-800/80">
                            <div class="text-[11px] text-slate-400 mb-0.5">סך הכנסות צפויות</div>
                            <div id="stats-total-revenue" class="text-xl font-black text-gold">0 ₪</div>
                        </div>
                    </div>
                </div>

            </div>
        `;
        ui.switchTab('projects');
        ui.updateGlobalStats();
    },

    // ניווט בין דפים ועדכון העיצוב של הכפתור שנבחר
    switchTab: (tabName) => {
        const container = document.getElementById('dynamic-view');
        if (!container) return;

        // איפוס והדגשת הכפתור הפעיל בתפריט
        ['projects', 'attendance', 'finance', 'navigation'].forEach(t => {
            const btn = document.getElementById(`btn-tab-${t}`);
            if (btn) {
                btn.classList.remove('border-gold', 'bg-gold/10');
                btn.classList.add('border-gold/20');
            }
        });
        const activeBtn = document.getElementById(`btn-tab-${tabName}`);
        if (activeBtn) {
            activeBtn.classList.remove('border-gold/20');
            activeBtn.classList.add('border-gold', 'bg-gold/10');
        }

        // טעינת הדף הרלוונטי
        if (tabName === 'projects') {
            container.innerHTML = `
                <div class="glass-panel p-5 rounded-3xl border border-gold/20 shadow-lg">
                    <h3 class="text-md font-bold text-gold mb-4 uppercase tracking-wider">רישום ועדכון פרויקט</h3>
                    <div class="space-y-3">
                        <input id="p-client" placeholder="שם הלקוח / חברה" class="w-full bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 text-white placeholder-slate-500 text-sm focus:border-gold outline-none transition-all">
                        <input id="p-type" placeholder="סוג העבודה (גבס, צבע, אינסטלציה...)" class="w-full bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 text-white placeholder-slate-500 text-sm focus:border-gold outline-none transition-all">
                        <input id="p-address" placeholder="כתובת האתר מלאה" class="w-full bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 text-white placeholder-slate-500 text-sm focus:border-gold outline-none transition-all">
                        <input id="p-price" type="number" placeholder="סכום הפרויקט בש"ח" class="w-full bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 text-white placeholder-slate-500 text-sm focus:border-gold outline-none transition-all">
                        <input id="p-worker" placeholder="שם מנהל עבודה / עובד אחראי" class="w-full bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 text-white placeholder-slate-500 text-sm focus:border-gold outline-none transition-all">
                        <button onclick="ui.handleAddProject()" class="w-full bg-gold text-slate-950 font-black py-4 rounded-xl hover:bg-amber-600 transition-all shadow-md text-sm mt-2">שמור פרויקט חדש במערכת</button>
                    </div>
                </div>
                <div class="glass-panel p-5 rounded-3xl border border-slate-900">
                    <h3 class="text-sm font-bold text-slate-300 mb-3">רשימת פרויקטים קיימים</h3>
                    <div id="ui-projects-list" class="space-y-3 max-h-72 overflow-y-auto pr-0.5"></div>
                </div>
            `;
            ui.loadProjectsList();
        } 
        
        else if (tabName === 'attendance') {
            container.innerHTML = `
                <div class="glass-panel p-5 rounded-3xl border border-blue-500/20 shadow-lg">
                    <h3 class="text-md font-bold text-blue-400 mb-4 uppercase tracking-wider">דיווח נוכחות עובדי שטח</h3>
                    <div class="space-y-3">
                        <input id="a-name" placeholder="שם מלא של העובד" class="w-full bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 text-white placeholder-slate-500 text-sm focus:border-blue-500 outline-none transition-all">
                        <input id="a-location" placeholder="מיקום / שם אתר העבודה" class="w-full bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 text-white placeholder-slate-500 text-sm focus:border-blue-500 outline-none transition-all">
                        <div class="grid grid-cols-2 gap-3 mt-2">
                            <button onclick="ui.handleAttendance('כניסה')" class="bg-emerald-600 hover:bg-emerald-700 py-3.5 rounded-xl font-bold text-white text-sm transition-all shadow-md">דיווח כניסה (In)</button>
                            <button onclick="ui.handleAttendance('יציאה')" class="bg-rose-600 hover:bg-rose-700 py-3.5 rounded-xl font-bold text-white text-sm transition-all shadow-md">דיווח יציאה (Out)</button>
                        </div>
                    </div>
                </div>
                <div class="glass-panel p-5 rounded-3xl border border-slate-900">
                    <h3 class="text-sm font-bold text-slate-300 mb-3">יומן נוכחות יומי</h3>
                    <div id="ui-attendance-list" class="space-y-2.5 max-h-72 overflow-y-auto pr-0.5"></div>
                </div>
            `;
            ui.loadAttendanceList();
        } 
        
        else if (tabName === 'finance') {
            container.innerHTML = `
                <div class="glass-panel p-5 rounded-3xl border border-purple-500/20 shadow-lg">
                    <h3 class="text-md font-bold text-purple-400 mb-4 uppercase tracking-wider">מנוע פיננסי ודוחות הכנסה</h3>
                    <div class="space-y-5">
                        <div class="bg-slate-900 p-5 rounded-2xl text-center border border-purple-500/10">
                            <span class="text-[11px] text-slate-400 uppercase block mb-1 tracking-wider">מחזור תקציבי מנוהל כולל</span>
                            <div id="finance-total" class="text-3xl font-black text-white">0 ₪</div>
                        </div>
                        <div class="border-t border-slate-800/80 pt-4">
                            <h4 class="text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">פירוט תזרימי לפי פרויקטים</h4>
                            <div id="finance-breakdown" class="space-y-2 max-h-60 overflow-y-auto pr-0.5"></div>
                        </div>
                    </div>
                </div>
            `;
            ui.loadFinanceData();
        } 
        
        else if (tabName === 'navigation') {
            container.innerHTML = `
                <div class="glass-panel p-5 rounded-3xl border border-amber-500/20 shadow-lg">
                    <h3 class="text-md font-bold text-amber-400 mb-4 uppercase tracking-wider">מרכז ניווט מהיר לאתרי עבודה</h3>
                    <div class="space-y-4">
                        <div class="bg-slate-900 p-3.5 rounded-xl border border-slate-800 flex gap-2">
                            <input id="nav-direct-address" placeholder="הזן כתובת לניווט חופשי" class="flex-1 bg-transparent text-white text-sm outline-none placeholder-slate-500">
                            <button onclick="window.waze.navigate(document.getElementById('nav-direct-address').value)" class="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs transition-all">ניווט ישיר</button>
                        </div>
                        <div class="border-t border-slate-800/80 pt-3">
                            <h4 class="text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">בחר אתר פרויקט לניווט מונחה:</h4>
                            <div id="ui-navigation-list" class="space-y-2 max-h-60 overflow-y-auto pr-0.5"></div>
                        </div>
                    </div>
                </div>
            `;
            ui.loadNavigationList();
        }
    },

    // טיפול באיסוף ושמירת נתוני טופס הפרויקט
    handleAddProject: () => {
        const client = document.getElementById('p-client').value.trim();
        const type = document.getElementById('p-type').value.trim();
        const address = document.getElementById('p-address').value.trim();
        const price = document.getElementById('p-price').value.trim();
        const worker = document.getElementById('p-worker').value.trim();

        if (!client || !price) {
            alert("חובה להזין שם לקוח ומחיר פרויקט לצורך רישום");
            return;
        }

        window.logic.addProject(client, type, address, price, worker).then(() => {
            alert("הפרויקט סונכרן ונשמר בהצלחה במסד הנתונים");
            ui.switchTab('projects');
            ui.updateGlobalStats();
        }).catch(err => alert("שגיאה בסנכרון: " + err));
    },

    // טיפול ברישום ושליחת נוכחות עובד
    handleAttendance: (action) => {
        const name = document.getElementById('a-name').value.trim();
        const location = document.getElementById('a-location').value.trim();

        if (!name) {
            alert("אנא הזן שם עובד לביצוע הדיווח");
            return;
        }

        window.logic.recordAttendance(name, action, location).then(() => {
            alert(`דווחה פעולת ${action} בהצלחה עבור ${name}`);
            ui.switchTab('attendance');
        }).catch(err => alert("שגיאה בדיווח: " + err));
    },

    // טעינה ורענון רשימת הפרויקטים בדף הפרויקטים
    loadProjectsList: () => {
        window.logic.getData('projects', (data) => {
            const listContainer = document.getElementById('ui-projects-list');
            if (!listContainer) return;
            
            const entries = Object.entries(data);
            if (entries.length === 0) {
                listContainer.innerHTML = `<div class="text-xs text-slate-500 italic text-center py-6">אין פרויקטים רשומים במערכת</div>`;
                return;
            }

            listContainer.innerHTML = entries.map(([id, p]) => `
                <div class="bg-slate-900/60 p-4 rounded-xl border border-slate-800/60 flex justify-between items-center shadow-sm">
                    <div>
                        <div class="font-bold text-white text-sm">${p.client}</div>
                        <div class="text-[11px] text-slate-400 mt-0.5">${p.type} <span class="text-slate-600">|</span> מנהל: ${p.worker}</div>
                        <div class="text-[10px] text-slate-500 mt-0.5">${p.address !== 'לא צוין' ? p.address : ''}</div>
                    </div>
                    <div class="text-left">
                        <div class="text-sm font-black text-gold">${p.price.toLocaleString()} ₪</div>
                        <button onclick="window.logic.deleteEntry('projects', '${id}')" class="text-[10px] text-rose-500/80 font-bold mt-1.5 inline-block hover:underline">מחיקה</button>
                    </div>
                </div>
            `).join('');
        });
    },

    // טעינה ורענון יומן הנוכחות
    loadAttendanceList: () => {
        window.logic.getData('attendance', (data) => {
            const listContainer = document.getElementById('ui-attendance-list');
            if (!listContainer) return;

            const entries = Object.entries(data).reverse();
            if (entries.length === 0) {
                listContainer.innerHTML = `<div class="text-xs text-slate-500 italic text-center py-6">אין דיווחי נוכחות פעילים להיום</div>`;
                return;
            }

            listContainer.innerHTML = entries.map(([id, a]) => `
                <div class="bg-slate-900/40 p-3 rounded-xl flex justify-between items-center text-xs border border-slate-850">
                    <div class="flex items-center gap-2.5">
                        <span class="${a.action === 'כניסה' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'} px-2 py-0.5 rounded-md font-bold text-[10px]">${a.action}</span>
                        <span class="text-slate-200 font-bold">${a.name}</span>
                    </div>
                    <div class="text-left flex flex-col items-end">
                        <span class="text-slate-400 font-medium">${a.time}</span>
                        <span class="text-[10px] text-slate-500 mt-0.5">${a.location !== 'לא הוגדר' ? a.location : ''}</span>
                    </div>
                </div>
            `).join('');
        });
    },

    // טעינה ועדכון הדוחות הכספיים
    loadFinanceData: () => {
        window.logic.getData('projects', (data) => {
            const totalContainer = document.getElementById('finance-total');
            const breakdownContainer = document.getElementById('finance-breakdown');
            if (!totalContainer || !breakdownContainer) return;

            const total = window.logic.calculateRevenue(data);
            totalContainer.innerText = `${total.toLocaleString()} ₪`;

            const entries = Object.values(data);
            if (entries.length === 0) {
                breakdownContainer.innerHTML = `<div class="text-xs text-slate-500 italic text-center py-4">אין נתונים כספיים זמינים</div>`;
                return;
            }

            breakdownContainer.innerHTML = entries.map(p => `
                <div class="flex justify-between items-center bg-slate-900/40 p-3 rounded-xl text-xs border border-slate-850">
                    <div class="flex flex-col">
                        <span class="text-slate-200 font-bold">${p.client}</span>
                        <span class="text-[10px] text-slate-500 mt-0.5">${p.type}</span>
                    </div>
                    <span class="text-slate-100 font-black">${p.price.toLocaleString()} ₪</span>
                </div>
            `).join('');
        });
    },

    // טעינת רשימת אתרי העבודה לצורך ניווט מונחה
    loadNavigationList: () => {
        window.logic.getData('projects', (data) => {
            const container = document.getElementById('ui-navigation-list');
            if (!container) return;

            const entries = Object.values(data).filter(p => p.address && p.address !== "לא צוין");
            if (entries.length === 0) {
                container.innerHTML = `<div class="text-xs text-slate-500 italic text-center py-6">לא נמצאו פרויקטים עם כתובת מוגדרת במערכת</div>`;
                return;
            }

            container.innerHTML = entries.map(p => `
                <div onclick="window.waze.navigate('${p.address}')" class="bg-slate-900/70 hover:bg-slate-900 p-4 rounded-xl border border-slate-850 flex justify-between items-center cursor-pointer transition-all active:scale-[0.99]">
                    <div class="flex flex-col">
                        <span class="text-xs font-bold text-slate-200">${p.client}</span>
                        <span class="text-[10px] text-slate-400 mt-0.5">${p.address}</span>
                    </div>
                    <div class="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400 border border-amber-500/20 text-sm">🚘</div>
                </div>
            `).join('');
        });
    },

    // עדכון שוטף של מוני הנתונים הכלליים בלוח הבקרה התחתון
    updateGlobalStats: () => {
        window.logic.getData('projects', (data) => {
            const activeProjectsCount = Object.keys(data).length;
            const totalRevenue = window.logic.calculateRevenue(data);

            const domCount = document.getElementById('stats-active-projects');
            const domRev = document.getElementById('stats-total-revenue');

            if (domCount) domCount.innerText = activeProjectsCount;
            if (domRev) domRev.innerText = `${totalRevenue.toLocaleString()} ₪`;
        });
    }
};

// אתחול והרצת המערכת עם טעינת הדף
document.addEventListener('DOMContentLoaded', () => {
    window.ui.render();
});
