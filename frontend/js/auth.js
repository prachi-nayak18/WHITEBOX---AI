firebase.initializeApp(window.WhiteboxConfig.FIREBASE);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;

    auth.signInWithEmailAndPassword(email, pass)
.then((userCredential) => {
            window.location.href = "app.html"; // Login ke baad kahan jana hai
        })
        .catch((error) => {
            alert("Error: " + error.message);
        });
}

// 4. Handle Google Login (Optional)
function handleGoogleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then(() => {
            window.location.href = "app.html";
        })
        .catch((error) => {
            alert(error.message);
        });
}
function handleSignUp(event) {
    event.preventDefault(); // Page refresh hone se rokta hai
    
    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;

    console.log("Account banane ki koshish...", email);

    auth.createUserWithEmailAndPassword(email, pass)
        .then((userCredential) => {
            alert("Badhai ho! Account ban gaya.");
            window.location.href = "signin.html"; // Account banne ke baad login page par bhej dega
        })
        .catch((error) => {
            // Agar email pehle se use ho raha hai ya password weak hai toh alert dikhayega
            alert("Galti: " + error.message);
        });
}

// ======================================================
// 1. CHECK REDIRECT RESULT (Page load hote hi check karega)
// ======================================================
// Jab user Google se wapas ayega, ye function user ka data nikal lega
auth.getRedirectResult()
  .then((result) => {
    if (result.user) {
      console.log("Welcome Back:", result.user.displayName);
      
      // Browser memory mein data save karo
      localStorage.setItem("userEmail", result.user.email);
      localStorage.setItem("userName", result.user.displayName);
      localStorage.setItem("userPic", result.user.photoURL);

      // Chat page par bhej do
      window.location.href = "app.html"; 
    }
  })
  .catch((error) => {
    if (error.code !== "auth/no-current-user") {
        console.error("Login Error:", error.message);
    }
  });

// ======================================================
// 2. GOOGLE LOGIN FUNCTION (Ab Redirect use karega)
// ======================================================
document.getElementById('googleBtn').onclick = function() {
    // Popup ki jagah Redirect use kar rahe hain taaki error na aaye
    auth.signInWithRedirect(provider);
};

// ======================================================
// 3. NORMAL EMAIL/PASSWORD LOGIN
// ======================================================
function loginUser() {
  const email = document.querySelector("input[type='email']").value;
  const password = document.querySelector("input[type='password']").value;

  if (!email || !password) {
    alert("Please fill all fields");
    return;
  }

  localStorage.setItem("userEmail", email);
  window.location.href = "app.html";
}

// ======================================================
// 4. CHECK AUTH
// ======================================================
function checkAuth() {
  const user = localStorage.getItem("userEmail");
  if (!user && !window.location.pathname.includes("login.html")) {
    window.location.href = "login.html";
  }
}

// ======================================================
// 5. LOGOUT FUNCTION
// ======================================================
function logout() {
  auth.signOut().then(() => {
    localStorage.clear();
    window.location.href = "login.html";
  });
}

// Apple button placeholder
document.getElementById('iosBtn').onclick = function() {
  alert("🍎 Apple Login is coming soon!");
};
// auth.js - Simple Navigation Logic

function goToSignIn() {
    console.log("Navigating to Sign In...");
    window.location.href = "signin.html";
}

function goToSignUp() {
    console.log("Navigating to Sign Up...");
    window.location.href = "signup.html";
}
// Token save karo
AppStorage.setToken(response.token);
// User details save karo
AppStorage.setUser(response.user)
window.location.href = "dashboard.html";