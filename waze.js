// ARTFLOW ENTERPRISE - NAVIGATION MODULE - V3.0
// מודול ייעודי לניהול מערך הניווט והאינטגרציה מול מנוע Waze

window.waze = {
    // פונקציית ליבה לפתיחת ניווט מונחה כתובת
    navigate: (address) => {
        if (!address || address.trim() === "" || address === "לא צוין") {
            alert("לא נמצאה כתובת תקינה לביצוע ניווט במערכת");
            return;
        }

        // ניקוי והכנת הכתובת לקישור דפדפן/אפליקציה
        const cleanAddress = address.trim();
        const encodedAddress = encodeURIComponent(cleanAddress);
        const wazeUrl = `https://waze.com/ul?q=${encodedAddress}&navigate=yes`;

        // שיגור הניווט לחלונית חדשה או ישירות לאפליקציית הנייד
        const newWindow = window.open(wazeUrl, '_blank');
        
        if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
            alert("הדפדפן חסם את פתיחת הניווט. אנא אשר חלונות קופצים (Popups) עבור אפליקציה זו");
        }
    }
};

console.log("Artflow Waze Navigation Module V3.0 Loaded.");
