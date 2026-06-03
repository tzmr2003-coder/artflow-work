// ARTFLOW ENTERPRISE - UI ENGINE - V3.0
// COMPLETE SYSTEM INTERFACE WITH MULTI-MODULE INTEGRATION

window.ui = {
    render: () => {
        const root = document.getElementById('main-content');
        root.innerHTML = `
            <div class="space-y-8 max-w-2xl mx-auto pb-12">
                
                <div class="grid grid-cols-4 gap-2 mb-6">
                    <button onclick="ui.switchTab('projects')" class="p-3 rounded-xl glass-panel text-center border-gold/30 hover:border-gold transition-all">
                        <div class="text-xl mb-1">🏗️</div>
                        <div class="text-[10px] font-bold text-slate-300">פרויקטים</div>
                    </button>
                    <button onclick="ui.switchTab('attendance')" class="p-3 rounded-xl glass-panel text-center border-gold/30 hover:border-gold transition-all">
                        <div class="text-xl mb-1">👷</div>
                        <div class="text-[10px] font-bold text-slate-300">נוכחות</div>
                    </button>
                    <button onclick="ui.switchTab('finance')" class="p-3 rounded-xl glass-panel text-center border-gold/30 hover:border-gold transition-all">
                        <div class="text-xl mb-1">💰</div>
                        <div class="text-[10px] font-bold text-slate-300">כספים</div>
                    </button>
                    <button onclick="ui.switchTab('navigation')" class="p-3 rounded-xl glass-panel text-center border-gold/30 hover:border-gold transition-all">
                        <div class="text-xl mb-1">📍</div>
                        <div class="text-[10px] font-bold text-slate-300">ניווט</div>
                    </button>
                </div>

                <div id="dynamic-view" class="space-y-6">
                    </div>

                <div class="glass-panel p-6 rounded-3xl border border-emerald-500/20 shadow-2xl mt-8">
                    <div class="flex justify-between items-center mb-4">
                        <h4 class="text-sm font-bold text-emerald-400 uppercase tracking-wider">סטטוס פעילות בזמן אמת</h4>
                        <span class="text-[11px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full">מחובר לרשת</span>
                    </div>
                    <div class="grid grid-cols-2 gap-4 text-center">
                        <div class="bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
                            <div class="text-xs text-slate-400 mb-1">פרויקטים פעילים</div>
                            <div id="stats-active-projects" class="text-2xl font-black text-white">0</div>
                        </div>
                        <div class="bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
                            <div class="text-xs text-slate-400 mb-1">סה"כ הכנסות צפויות</div>
                            <div id="stats-total-revenue" class="text-2xl font-black text-gold">0 ₪</div>
                        </div>
                    </div>
                </div>

            </div>
        `;
        ui.switchTab('projects');
        ui.updateGlobalStats();
    },

    switchTab: (tabName) => {
        const container = document.getElementById('dynamic-view');
        if (!container) return;

        if (tabName === 'projects') {
            container.innerHTML = `
                <div class="glass-panel p-6 rounded-3xl border border-gold/30 shadow-2xl">
                    <h3 class="text-lg font-bold text-gold mb-5 uppercase tracking-widest">רישום ועדכון פרויקט</h3>
                    <div class="grid grid-cols-1 gap-4">
                        <input id="p-client" placeholder="שם הלקוח / חברה" class="w-full bg-slate-900 p-4 rounded-xl border border-slate-700 text-white placeholder-slate-500 focus:border-gold outline-none">
                        <input id="p-type" placeholder="סוג העבודה (גבס, צבע, אינסטלציה...)" class="w-full bg-slate-900 p-4 rounded-xl border border-slate-700 text-white placeholder-slate-500 focus:border-gold outline-none">
                        <input id="p-address" placeholder="כתובת האתר מלאה" class="w-full bg-slate-900 p-4 rounded-xl border border-slate-700 text-white placeholder-slate-500 focus:border-gold outline-none">
                        <input id="p-price" type="number" placeholder="סכום הפרויקט בש"ח" class="w-full bg-slate-900 p-4 rounded-xl border border-slate-700 text-white placeholder-slate-500 focus:border-gold outline-none">
                        <input id="p-worker" placeholder="שם מנהל עבודה / עובד אחראי" class="w-full bg-slate-900 p-4 rounded-xl border border-slate-700 text-white placeholder-slate-500 focus:border-gold outline-none">
                        <button onclick="ui.handleAddProject()" class="w-full bg-gold text-slate-950 font-black py-4 rounded-xl hover:bg-yellow-600 transition-all shadow-lg">שמור פרויקט חדש במערכת</button>
                    </div>
                </div>
                <div class="glass-panel p-6 rounded-3xl border border-slate-800">
                    <h3 class="text-md font-bold text-slate-300 mb-4">רשימת פרויקטים קיימים</h3>
                    <div id="ui-projects-list" class="space-y-3 max-h-60 overflow-y-auto pr-1"></div>
                </div>
            `;
            ui.loadProjectsList();
        } 
        
        else if (tabName === 'attendance') {
            container.innerHTML = `
                <div class="glass-panel p-6 rounded-3xl border border-blue-500/30 shadow-2xl">
                    <h3 class="text-lg font-bold text-blue-400 mb-5 uppercase tracking-widest">דיווח נוכחות עובדי שטח</h3>
                    <div class="space-y-4">
                        <input id="a-name" placeholder="שם מלא של העובד" class="w-full bg-slate-900 p-4 rounded-xl border border-slate-700 text-white placeholder-slate-500 focus:border-blue-500 outline-none">
                        <input id="a-location" placeholder="מיקום / שם אתר העבודה" class="w-full bg-slate-900 p-4 rounded-xl border border-slate-700 text-white placeholder-slate-500 focus:border-blue-500 outline-none">
                        <div class="grid grid-cols-2 gap-4">
                            <button onclick="ui.handleAttendance('כניסה')" class="bg-emerald-600 hover:bg-emerald-700 py-4 rounded-xl font-bold text-white transition-all shadow-md">דיווח כניסה (In)</button>
                            <button onclick="ui.handleAttendance('יציאה')" class="bg-rose-600 hover:bg-rose-700 py-4 rounded-xl font-bold text-white transition-all shadow-md">דיווח יציאה (Out)</button>
                        </div>
                    </div>
                </div>
                <div class="glass-panel p-6 rounded-3xl border border-slate-800">
                    <h3 class="text-md font-bold text-slate-300 mb-4">יומן נוכחות יומי</h3>
                    <div id="ui-attendance-list" class="space-y-2 max-h-60 overflow-y-auto pr-1"></div>
                </div>
            `;
            ui.loadAttendanceList();
        } 
        
        else if (tabName === 'finance') {
            container.innerHTML = `
                <div class="glass-panel p-6 rounded-3xl border border-purple-500/30 shadow-2xl">
                    <h3 class="text-lg font-bold text-purple-400 mb-5 uppercase tracking-widest">מנוע פיננסי ודוחות הכנסה</h3>
                    <div class="space-y-6">
                        <div class="bg-slate-900 p-6 rounded-2xl text-center border border-purple-500/10">
                            <span class="text-xs text-slate-400 uppercase block mb-1">מחזור תקציבי כולל</span>
                            <div id="finance-total" class="text-4xl font-black text-white">0 ₪</div>
                        </div>
                        <div class="border-t border-slate-800 pt-4">
                            <h4 class="text-sm font-bold text-slate-400 mb-3">פירוט תזרימי לפי פרויקטים</h4>
                            <div id="finance-breakdown" class="space-y-2 max-h-48 overflow-y-auto"></div>
                        </div>
                    </div>
                </div>
            `;
            ui.loadFinanceData();
        } 
        
        else if (tabName === 'navigation') {
            container.innerHTML = `
                <div class="glass-panel p-6 rounded-3xl border border-amber-500/30 shadow-2xl">
                    <h3 class="text-lg font-bold text-amber-400 mb-5 uppercase tracking-widest">מרכז ניווט מהיר לאתרי עבודה</h3>
                    <div class="space-y-4">
                        <div class="bg-slate-900 p-4 rounded-xl border border-slate-800 flex gap-2">
                            <input id="nav-direct-address" placeholder="הזן כתובת לניווט ישיר" class="flex-1 bg-transparent text-white outline-none placeholder-slate-500">
                            <button onclick="window.waze.navigate(document.getElementById('nav-direct-address').value)" class="bg-amber-500 text-slate-950 font-bold px-4 py-2 rounded-lg">סע</button>
                        </div>
                        <div class="border-t border-slate-800 pt-4">
                            <h4 class="text-sm font-bold text-slate-400 mb-3 font-medium">בחר אתר פרויקט לניווט בוויז:</h4>
                            <div id="ui-navigation-list" class="space-y-2 max-h-60 overflow-y-auto"></div>
                        </div>
                    </div>
                </div>
            `;
            ui.loadNavigationList();
        }
    },

    handleAddProject: () => {
        const client = document.getElementById('p-client').value;
        const type = document.getElementById('p-type').value;
        const address = document.getElementById('p-address').value;
        const price = document.getElementById('p-price').value;
        const worker = document.getElementById('p-worker').value;

        if (!client || !price) {
            alert("חובה להזין שם לקוח ומחיר פרויקט");
            return;
        }

        window.logic.addProject(client, type, address, price, worker).then(() => {
            alert("הפרויקט נשמר וסונכרן בהצלחה");
            ui.switchTab('projects');
            ui.updateGlobalStats();
        });
    },

    handleAttendance: (action) => {
        const name = document.getElementById('a-name').value;
        const location = document.getElementById('a-location').value;

        if (!name) {
            alert("אנא הזן שם עובד לדיווח");
            return;
        }

        window.logic.recordAttendance(name, action, location).then(() => {
            alert(`דווחה ${action} בהצלחה עבור ${name}`);
            ui.switchTab('attendance');
        });
    },

    loadProjectsList: () => {
        window.logic.getData('projects', (data) => {
            const listContainer = document.getElementById('ui-projects-list');
            if (!listContainer) return;
            
            const entries = Object.entries(data);
            if (entries.length === 0) {
                listContainer.innerHTML = `<div class="text-xs text-slate-500 italic text-center py-4">אין פרויקטים רשומים</div>`;
                return;
            }

            listContainer.innerHTML = entries.map(([id, p]) => `
                <div class="bg-slate-900/80 p-4 rounded-xl border border-slate-850 flex justify-between items-center">
                    <div>
                        <div class="font-bold text-white text-sm">${p.client}</div>
                        <div class="text-xs text-slate-400">${p.type} | מנהל: ${p.worker}</div>
                    </div>
                    <div class="text-left">
                        <div class="text-sm font-black text-gold">${p.price} ₪</div>
                        <button onclick="window.logic.deleteEntry('projects', '${id}').then(() => ui.loadProjectsList())" class="text-[10px] text-rose-500 mt-1 block hover:underline">מחק</button>
                    </div>
                </div>
            `).join('');
        });
    },

    loadAttendanceList: () => {
        window.logic.getData('attendance', (data) => {
            const listContainer = document.getElementById('ui-attendance-list');
            if (!listContainer) return;

            const entries = Object.values(data).reverse();
            if (entries.length === 0) {
                listContainer.innerHTML = `<div class="text-xs text-slate-500 italic text-center py-4">אין דיווחי נוכחות להיום</div>`;
                return;
            }

            listContainer.innerHTML = entries.map(a => `
                <div class="bg-slate-900/50 p-3 rounded-xl flex justify-between items-center text-xs border border-slate-800">
                    <div class="flex items-center gap-2">
                        <span class="${a.action === 'כניסה' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'} px-2 py-0.5 rounded font-bold">${a.action}</span>
                        <span class="text-white font-bold">${a.name}</span>
                    </div>
                    <div class="text-slate-400">${a.location !== 'לא הוגדר' ? a.location : ''} | ${a.time}</div>
                </div>
            `).join('');
        });
    },

    loadFinanceData: () => {
        window.logic.getData('projects', (data) => {
            const totalContainer = document.getElementById('finance-total');
            const breakdownContainer = document.getElementById('finance-breakdown');
            if (!totalContainer || !breakdownContainer) return;

            const total = window.logic.calculateRevenue(data);
            totalContainer.innerText = `${total} ₪`;

            const entries = Object.values(data);
            if (entries.length === 0) {
                breakdownContainer.innerHTML = `<div class="text-xs text-slate-500 italic text-center py-2">אין נתונים פיננסיים זמינים</div>`;
                return;
            }

            breakdownContainer.innerHTML = entries.map(p => `
                <div class="flex justify-between items-center bg-slate-900/40 p-3 rounded-lg text-xs border border-slate-800">
                    <span class="text-slate-300 font-medium">${p.client} <span class="text-slate-500">(${p.date})</span></span>
                    <span class="text-white font-bold">${p.price} ₪</span>
                </div>
            `).join('');
        });
    },

    loadNavigationList: () => {
        window.logic.getData('projects', (data) => {
            const container = document.getElementById('ui-navigation-list');
            if (!container) return;

            const entries = Object.values(data).filter(p => p.address && p.address !== "לא צוין");
            if (entries.length === 0) {
                container.innerHTML = `<div class="text-xs text-slate-500 italic text-center py-4">לא נמצאו פרויקטים עם כתובות מוגדרות</div>`;
                return;
            }

            container.innerHTML = entries.map(p => `
                <div onclick="window.waze.navigate('${p.address}')" class="bg-slate-900 hover:bg-slate-850 p-4 rounded-xl border border-slate-800 flex justify-between items-center cursor-pointer transition-all">
                    <div>
                        <div class="text-xs font-bold text-white">${p.client}</div>
                        <div class="text-[11px] text-slate-400 mt-0.5">${p.address}</div>
                    </div>
                    <div class="text-lg">🚘</div>
                </div>
            `).join('');
        });
    },

    updateGlobalStats: () => {
        window.logic.getData('projects', (data) => {
            const activeProjectsCount = Object.keys(data).length;
            const totalRevenue = window.logic.calculateRevenue(data);

            const domCount = document.getElementById('stats-active-projects');
            const domRev = document.getElementById('stats-total-revenue');

            if (domCount) domCount.innerText = activeProjectsCount;
            if (domRev) domRev.innerText = `${totalRevenue} ₪`;
        });
    }
};

window.ui.render();
