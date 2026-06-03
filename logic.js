// logic.js - הלוגיקה של העסק
window.logic = {
    addProject: (data) => {
        const newProject = {
            client: data.client,
            type: data.type,
            address: data.address,
            price: data.price,
            worker: data.worker,
            timestamp: Date.now()
        };
        return window.db.ref('projects').push(newProject);
    },

    recordAttendance: (name, type) => {
        return window.db.ref('attendance').push({
            name: name,
            type: type,
            time: new Date().toLocaleString()
        });
    },

    navigateWaze: (address) => {
        const url = `https://waze.com/ul?q=${encodeURIComponent(address)}&navigate=yes`;
        window.open(url, '_blank');
    },

    deleteRecord: (path, id) => {
        return window.db.ref(`${path}/${id}`).remove();
    }
};
