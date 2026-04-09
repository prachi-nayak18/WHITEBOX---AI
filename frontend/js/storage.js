class Storage {
    static setToken(token) {
        localStorage.setItem('whitebox_auth_token', token);
    }

    // 2. Token Nikalna (Auth Middleware ke liye)
    static getToken() {
        return localStorage.getItem('whitebox_auth_token');
    }

    // 3. User Data Save karna
    static setUser(user) {
        localStorage.setItem('whitebox_user', JSON.stringify(user));
    }

    static getUser() {
        const user = localStorage.getItem('whitebox_user');
        return user ? JSON.parse(user) : null;
    }

    // 4. Logout (Sab saaf karna)
    static clearAll() {
        localStorage.removeItem('whitebox_auth_token');
        localStorage.removeItem('whitebox_user');
        // Agar koi aur keys hain toh wo bhi yahan se remove hongi
    }

    // 5. Theme Preference (Optional)
    static setTheme(theme) {
        localStorage.setItem('theme', theme);
    }
}

// Global use ke liye export
window.AppStorage = Storage;