// ARTFLOW ENTERPRISE - CENTRAL LOGIC ENGINE - V3.0
// מודול ניהול ותיאום נתונים עסקיים מול מסד הנתונים

window.logic = {
    
    // 1. שמירת פרויקט חדש במערכת
    addProject: (client, type, address, price, worker) => {
        const projectData = {
            client: client || "לא צוין",
            type: type || "כללי",
            address: address || "לא צוין",
            price: parseFloat(price) || 0,
            worker: worker || "ללא עובד",
            timestamp: Date.now(),
            date: new Date().toLocaleDateString('he-IL'),
            status: "active"
        };
        return window.db.ref('projects').push(projectData);
    },

    // 2. רישום נוכחות עובדים יומי
    recordAttendance: (workerName, action, location) => {
        const attendanceData = {
            name: workerName,
            action: action, 
            location: location || "לא הוגדר",
            time: new Date().toLocaleTimeString('he-IL'),
            fullDate: new Date().toISOString()
        };
        return window.db.ref('attendance').push(attendanceData);
    },

    // 3. מנוע כספים - חישוב מחזור הכנסות כולל
    calculateRevenue: (projectsList) => {
        if (!projectsList) return 0;
        return Object.values(projectsList).reduce((total, p) => total + (parseFloat(p.price) || 0), 0);
    },

    // 4. מחיקת רשומה גנרית מכל נתיב במסד הנתונים
    deleteEntry: (category, entryId) => {
        if (!category || !entryId) return Promise.reject("נתונים חסרים למחיקה");
        return window.db.ref(`${category}/${entryId}`).remove();
    },

    // 5. האזנה שוטפת וסנכרון נתונים בזמן אמת
    getData: (path, callback) => {
        window.db.ref(path).on('value', (snapshot) => {
            callback(snapshot.val() || {});
        });
    }
};

console.log("Artflow Central Logic Engine V3.0 Loaded.");
