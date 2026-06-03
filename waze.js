// waze.js - מודול ניווט
window.waze = {
    navigate: (address) => {
        if (!address) {
            alert("לא הוזנה כתובת");
            return;
        }
        const url = `https://waze.com/ul?q=${encodeURIComponent(address)}&navigate=yes`;
        window.open(url, '_blank');
    }
};
