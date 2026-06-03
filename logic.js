// ARTFLOW ENTERPRISE - LOGIC ENGINE - V2.1
// COMPLETE DATABASE & BUSINESS LOGIC MODULE

window.logic = {
    
    // 1. PROJECT MANAGEMENT
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

    // 2. ATTENDANCE SYSTEM
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

    // 3. FINANCIAL REPORTING
    calculateRevenue: (projectsList) => {
        if (!projectsList) return 0;
        return Object.values(projectsList).reduce((total, p) => total + (parseFloat(p.price) || 0), 0);
    },

    // 4. NAVIGATION ENGINE
    openWaze: (address) => {
        if (!address) return;
        const encodedAddress = encodeURIComponent(address);
        const wazeUrl = `https://waze.com/ul?q=${encodedAddress}&navigate=yes`;
        window.open(wazeUrl, '_blank');
    },

    // 5. MAINTENANCE & DATA HANDLING
    deleteEntry: (category, entryId) => {
        if (!category || !entryId) return;
        return window.db.ref(`${category}/${entryId}`).remove();
    },

    getData: (path, callback) => {
        window.db.ref(path).on('value', (snapshot) => {
            callback(snapshot.val() || {});
        });
    },

    // 6. ADVANCED AGGREGATION
    getWorkerHours: (attendanceList, workerName) => {
        if (!attendanceList) return 0;
        return Object.values(attendanceList).filter(a => a.name === workerName).length;
    },

    // 7. PROJECT FILTERING
    getActiveProjects: (projectsList) => {
        if (!projectsList) return [];
        return Object.values(projectsList).filter(p => p.status === "active");
    }
};

console.log("Artflow Logic Engine V2.1 Initialized.");
