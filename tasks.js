// ARTFLOW ENTERPRISE - TASKS MODULE - V3.0
// מודול ייעודי לניהול, מעקב והקצאת משימות לצוות העובדים

window.tasks = {
    // 1. שמירת משימה חדשה במסד הנתונים
    addTask: (title, description, assignedWorker, deadline) => {
        if (!title || title.trim() === "") {
            alert("חובה להזין כותרת למשימה");
            return Promise.reject("כותרת חסרה");
        }

        const taskData = {
            title: title.trim(),
            description: description.trim() || "אין פירוט",
            worker: assignedWorker || "ללא שיוך",
            deadline: deadline || "לא נקבע",
            status: "open", // open, completed
            timestamp: Date.now(),
            date: new Date().toLocaleDateString('he-IL')
        };

        return window.db.ref('tasks').push(taskData);
    },

    // 2. עדכון סטטוס משימה (סימון כבוצעה / פתוחה מחדש)
    toggleTaskStatus: (taskId, currentStatus) => {
        const newStatus = currentStatus === "open" ? "completed" : "open";
        return window.db.ref(`tasks/${taskId}`).update({ status: newStatus });
    },

    // 3. מחיקת משימה לחלוטין מהמערכת
    deleteTask: (taskId) => {
        if (!taskId) return Promise.reject("מזהה משימה חסר");
        return window.db.ref(`tasks/${taskId}`).remove();
    },

    // 4. רינדור (הצגת) מסך המשימות בתוך ה-UI הדינמי
    renderView: () => {
        const container = document.getElementById('dynamic-view');
        if (!container) return;

        container.innerHTML = `
            <div class="glass-panel p-5 rounded-3xl border border-violet-500/20 shadow-lg">
                <h3 class="text-md font-bold text-violet-400 mb-4 uppercase tracking-wider">הקצאת משימה חדשה לצוות</h3>
                <div class="space-y-3">
                    <input id="t-title" placeholder="כותרת המשימה / היעד" class="w-full bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 text-white placeholder-slate-500 text-sm focus:border-violet-500 outline-none transition-all">
                    <textarea id="t-desc" placeholder="פירוט המשימה והנחיות עבודה..." rows="2" class="w-full bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 text-white placeholder-slate-500 text-sm focus:border-violet-500 outline-none transition-all resize-none"></textarea>
                    <input id="t-worker" placeholder="שם העובד המבצע" class="w-full bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 text-white placeholder-slate-500 text-sm focus:border-violet-500 outline-none transition-all">
                    <input id="t-deadline" type="date" class="w-full bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 text-white placeholder-slate-500 text-sm focus:border-violet-500 outline-none transition-all">
                    <button onclick="window.tasks.handleCreateTask()" class="w-full bg-violet-600 hover:bg-violet-700 text-white font-black py-4 rounded-xl transition-all shadow-md text-sm mt-2">שגר משימה ללוח העבודה</button>
                </div>
            </div>
            <div class="glass-panel p-5 rounded-3xl border border-slate-900">
                <h3 class="text-sm font-bold text-slate-300 mb-3">לוח משימות פעיל</h3>
                <div id="ui-tasks-list" class="space-y-3 max-h-72 overflow-y-auto pr-0.5"></div>
            </div>
        `;
        window.tasks.loadTasksList();
    },

    // 5. טיפול באיסוף הנתונים מהטופס ושליחה
    handleCreateTask: () => {
        const title = document.getElementById('t-title').value;
        const desc = document.getElementById('t-desc').value;
        const worker = document.getElementById('t-worker').value;
        const deadline = document.getElementById('t-deadline').value;

        window.tasks.addTask(title, desc, worker, deadline).then(() => {
            alert("המשימה נוספה ללוח בהצלחה");
            window.tasks.renderView();
        }).catch(err => alert("שגיאה בהוספה: " + err));
    },

    // 6. טעינה והצגה בזמן אמת של המשימות מהפיירבייס
    loadTasksList: () => {
        window.logic.getData('tasks', (data) => {
            const listContainer = document.getElementById('ui-tasks-list');
            if (!listContainer) return;

            const entries = Object.entries(data).reverse();
            if (entries.length === 0) {
                listContainer.innerHTML = `<div class="text-xs text-slate-500 italic text-center py-6">אין משימות פתוחות בלוח</div>`;
                return;
            }

            listContainer.innerHTML = entries.map(([id, t]) => `
                <div class="bg-slate-900/60 p-4 rounded-xl border border-slate-800/60 flex flex-col shadow-sm ${t.status === 'completed' ? 'opacity-50 line-through border-emerald-500/20' : ''}">
                    <div class="flex justify-between items-start">
                        <div>
                            <span class="text-xs font-bold text-slate-400 block uppercase tracking-wider mb-0.5">עבור: ${t.worker}</span>
                            <h4 class="font-bold text-white text-sm">${t.title}</h4>
                            <p class="text-xs text-slate-400 mt-1">${t.description}</p>
                        </div>
                        <div class="flex gap-2">
                            <button onclick="window.tasks.toggleTaskStatus('${id}', '${t.status}')" class="text-xs p-1.5 rounded-lg ${t.status === 'completed' ? 'bg-amber-500/10 text-amber-400' : 'bg-emerald-500/10 text-emerald-400'} font-bold">
                                ${t.status === 'completed' ? 'פתח' : 'בצע'}
                            </button>
                            <button onclick="window.tasks.deleteTask('${id}')" class="text-xs p-1.5 rounded-lg bg-rose-500/10 text-rose-400 font-bold">מחק</button>
                        </div>
                    </div>
                    <div class="flex justify-between items-center border-t border-slate-800/50 mt-3 pt-2 text-[10px] text-slate-500">
                        <span>נוצר: ${t.date}</span>
                        <span class="${t.status !== 'completed' ? 'text-violet-400 font-bold' : ''}">יעד: ${t.deadline}</span>
                    </div>
                </div>
            `).join('');
        });
    }
};

console.log("Artflow Tasks Management Module V3.0 Loaded.");
