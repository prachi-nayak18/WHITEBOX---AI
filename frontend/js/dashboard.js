firebase.initializeApp(window.WhiteboxConfig.FIREBASE);

const auth = firebase.auth();

// Check karo user logged in hai ya nahi
auth.onAuthStateChanged((user) => {
    if (user) {
        // User ka naam display karo (Agar Google se login hai toh displayName, warna email ka pehla hissa)
        const nameElement = document.getElementById('user-display-name');
        nameElement.innerText = user.displayName || user.email.split('@')[0];
        
        console.log("User logged in:", user.email);
    } else {
        // Agar login nahi hai toh wapas login page par bhej do
        window.location.href = "login.html";
    }
});

// Logout function (Agar aapne logout button banaya hai toh)
function handleLogout() {
    auth.signOut().then(() => {
        window.location.href = "login.html";
    });
}