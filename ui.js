// ARTFLOW ENTERPRISE - UI ENGINE - V2.1
// COMPLETE INTERFACE & VIEW CONTROLLER

window.ui = {
    render: () => {
        const root = document.getElementById('main-content');
        root.innerHTML = `
            <div class="space-y-8 max-w-2xl mx-auto p-4">
                <div class="text-center mb-10">
                    <h1 class="text-4xl font-black text-white tracking-tighter">ARTFLOW</h1>
                    <div class="h-1 w-20 bg-gold mx-auto mt-2"></div>
                </div>

                <div class="glass-panel p-6 rounded-3xl border border-gold/30 shadow-2xl">
                    <h3 class="text-lg font-bold text-gold mb-5 uppercase tracking-widest">רישום פרויקט חדש</h3>
                    <div class="grid grid-cols-1 gap-4">
                        <input id="p-client" placeholder="שם הלקוח" class="w-full bg-slate-900 p-4 rounded-xl border border-slate-700 text-white placeholder-slate-500">
                        <input id="p-type" placeholder="סוג עבודה" class="w-full bg-slate-900 p-4 rounded-xl border border-slate-700 text-white placeholder-slate-500">
                        <input id="p-address" placeholder="כתובת" class="w-full bg-slate-900 p-4 rounded-xl border border-slate-700 text-white placeholder-slate-500">
                        <input id="p-price" type="number" placeholder="סכום בש"ח" class="w-full bg-slate-900 p-4 rounded-xl border border-slate-700 text-white placeholder-slate-500">
                        <input id="p-worker" placeholder="שם עובד אחראי" class="w-full bg-slate-900 p-4 rounded-xl border border-slate-700 text-white placeholder-slate-500">
                        <button onclick="ui.handleAddProject()" class="w-full bg-gold text-slate-950 font-black py-4 rounded-xl hover:scale-[1.02] transition-all uppercase">שמור פרויקט למערכת</button>
                    </div>
                </div>

                <div class="glass-panel p-6 rounded-3xl border border-blue-500/30">
                    <h3 class="text-lg font-bold text-blue-400 mb-5 uppercase tracking-widest">ניהול נוכחות עובדים</h3>
                    <div class="flex gap-3">
                        <input id="a-name" placeholder="שם עובד" class="flex-1 bg-slate-900 p-4 rounded-xl border border-slate-700 text-white">
                        <button onclick="ui.handleAttendance('כניסה')" class="bg-green-600 px-6 rounded-xl font-bold text-white">כניסה</button>
                        <button onclick="ui.handleAttendance('יציאה')" class="bg-red-600 px-6 rounded-xl font-bold text-white">יציאה</button>
                    </div>
                </div>

                <div class="glass-panel p-6 rounded-3xl border border-purple-500/30 text-center">
                    <h3 class="text-sm text-slate-400 mb-2 uppercase tracking-widest">סך הכנסות מדווח</h3>
                    <div id="total-revenue" class="text-5xl font-black text-white">0 ₪</div>
                </div>
            </div>
        `;
        ui.updateStats();
    },

    handleAddProject: () => {
        const client = document.getElementById('p-client').value;
        const type = document.getElementById('p-type').value;
        const address = document.getElementById('p-address').value;
        const price = document.getElementById('p-price').value;
        const worker = document.getElementById('p-worker').value;

        window.logic.addProject(client, type, address, price, worker).then(() => {
            alert("הפרויקט נשמר בהצלחה");
            ui.updateStats();
        });
    },

    handleAttendance: (action) => {
        const name = document.getElementById('a-name').value;
        if(!name) return alert("אנא הזן שם עובד");
        window.logic.recordAttendance(name, action).then(() => alert("נוכחות עודכנה"));
    },

    updateStats: () => {
        window.logic.getData('projects', (data) => {
            const total = window.logic.calculateRevenue(data);
            document.getElementById('total-revenue').innerText = `${total} ₪`;
        });
    }
};

window.ui.render();
