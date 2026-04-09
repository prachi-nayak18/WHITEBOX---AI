const Utils = {
    // 1. Date Format karna (Chat history mein "2 mins ago" ya date dikhane ke liye)
    formatDate: (date) => {
        return new Intl.DateTimeFormat('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
            day: '2-digit',
            month: 'short'
        }).format(new Date(date));
    },

    // 2. String ko truncate karna (Dashboard par lambe message ko chota dikhane ke liye)
    truncateText: (text, limit = 50) => {
        if (text.length <= limit) return text;
        return text.substring(0, limit) + "...";
    },

    // 3. Email Validation check (Signup/Login se pehle frontend check)
    isValidEmail: (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    },

    // 4. Copy to Clipboard (AI response copy karne ke liye)
    copyToClipboard: (text) => {
        navigator.clipboard.writeText(text).then(() => {
            alert("Copied to clipboard! ");
        });
    },

    // 5. Loading Spinner toggle (Jab AI reply generate kar raha ho)
    toggleLoader: (elementId, show) => {
        const el = document.getElementById(elementId);
        if (el) el.style.display = show ? 'block' : 'none';
    }
};

// Global access ke liye
window.Utils = Utils;