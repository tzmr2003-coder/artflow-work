// ARTFLOW ENTERPRISE - REPORTS & HOURS ENGINE - V3.0
// מודול ייעודי לחישוב שעות עבודה, דוחות נוכחות וסיכומים תקופתיים

window.reports = {
    // 1. רינדור (הצגת) מסך הדוחות בתוך ה-UI הדינמי
    renderView: () => {
        const container = document.getElementById('dynamic-view');
        if (!container) return;

        container.innerHTML = `
            <div class="glass-panel p-5 rounded-3xl border border-teal-500/20 shadow-lg">
                <h3 class="text-md font-bold text-teal-400 mb-4 uppercase tracking-wider">מנוע סיכום שעות עבודה</h3>
                <div class="space-y-3">
                    <input id="rep-worker-name" placeholder="הזן שם עובד בדיוק (לדוגמא: אחמד)" class="w-full bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 text-white placeholder-slate-500 text-sm focus:border-teal-500 outline-none transition-all">
                    <button onclick="window.reports.handleCalculateHours()" class="w-full bg-teal-600 hover:bg-teal-700 text-white font-black py-4 rounded-xl transition-all shadow-md text-sm mt-1">חשב שעות וסכם פעילות</button>
                </div>
            </div>

            <div id="ui-report-results" class="hidden glass-panel p-5 rounded-3xl border border-slate-800 text-center space-y-2">
                <span class="text-[11px] text-slate-400 uppercase tracking-wider block">סה"כ דיווחי מערכת שנמצאו</span>
                <div id="rep-total-actions" class="text-3xl font-black text-teal-400">0</div>
                <p class="text-xs text-slate-400 border-t border-slate-800/60 pt-2 mt-2">רשימת הפעולות המלאה של העובד מוצגת ביומן הנוכחות.</p>
            </div>
        `;
    },

    // 2. לוגיקת חישוב וסינון הנתונים מתוך ה-Database
    handleCalculateHours: () => {
        const workerName = document.getElementById('rep-worker-name').value.trim();
        const resultsContainer = document.getElementById('ui-report-results');
        const totalActionsContainer = document.getElementById('rep-total-actions');

        if (!workerName) {
            alert("אנא הזן שם עובד לביצוע החישוב");
            return;
        }

        window.logic.getData('attendance', (data) => {
            if (!data) {
                alert("לא נמצאו דיווחי נוכחות כלל במסד הנתונים");
                return;
            }

            // סינון כל הפעולות ששייכות לעובד הספציפי הזה
            const workerEntries = Object.values(data).filter(entry => 
                entry.name && entry.name.toLowerCase() === workerName.toLowerCase()
            );

            if (workerEntries.length === 0) {
                alert(`לא נמצאו דיווחי נוכחות עבור העובד: ${workerName}`);
                if (resultsContainer) resultsContainer.classList.add('hidden');
                return;
            }

            // הצגת התוצאה ב-UI
            if (totalActionsContainer && resultsContainer) {
                totalActionsContainer.innerText = `${workerEntries.length} פעימות`;
                resultsContainer.classList.remove('hidden');
            }
        });
    }
};

console.log("Artflow Reports Engine V3.0 Loaded.");
