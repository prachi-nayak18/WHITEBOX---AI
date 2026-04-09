// ====== app.js (Edited for Free Mode Whitebox AI) ======

// ====== THEME TOGGLE ======
const toggleBtn = document.getElementById("theme-toggle");

if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });
}

// ====== NEW CHAT HANDLER ======
// +New button clears chatBox and resets input
const newChatBtn = document.querySelector(".sidebar button:nth-child(1)");
const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");

if (newChatBtn && chatBox) {
  newChatBtn.addEventListener("click", () => {
    chatBox.innerHTML = "";   // Clear all messages
    if (userInput) userInput.value = "";
  });
}

// ====== HISTORY / QUICK BUTTONS ======
const historyBtn = document.querySelector(".sidebar button:nth-child(2)");
const featuresBtn = document.querySelector(".sidebar button:nth-child(3)");

// Optional: you can add click events here
if (historyBtn) {
  historyBtn.addEventListener("click", () => {
    alert("History feature coming soon!");
  });
}

if (featuresBtn) {
  featuresBtn.addEventListener("click", () => {
    alert("Features coming soon!");
  });
}

// ====== VOICE INPUT ======
const micBtn = document.querySelector(".chat-bar button[onclick='startVoice()']");

if (micBtn && typeof startVoice === "function") {
  micBtn.addEventListener("click", startVoice);
}

// ====== CLEANUP FOR FREE MODE ======
// Remove unwanted UI elements (if any exist dynamically)
const paywall = document.querySelector(".paywall-modal");
if (paywall) paywall.remove();

const upgradeBtn = document.querySelector(".sidebar button.upgrade");
if (upgradeBtn) upgradeBtn.remove();

const freeBar = document.querySelector(".free-bar");
if (freeBar) freeBar.remove();

const creditsCounter = document.querySelector(".credits-counter");
if (creditsCounter) creditsCounter.remove();

// ====== OPTIONAL: Scroll chat to bottom automatically ======
function scrollChatToBottom() {
  if (chatBox) chatBox.scrollTop = chatBox.scrollHeight;
}

// Call scrollChatToBottom after every new message from chat.js

// ====== PAGE NAVIGATION ======
function openFeatures() {
  window.location.href = "features.html";
}

function openModels() {
  window.location.href = "models.html";
}

function openTools() {
  window.location.href = "tools.html";
}

function openDevelopers() {
  window.location.href = "developers.html";
}

function openDocs() {
  window.location.href = "docs.html";
}

function openSettings() {
  window.location.href = "settings.html";
}
function openHistory() {
  window.location.href = "history.html";
}

function openAccount() {
  window.location.href = "login.html";
}

function toggleTheme() {
  document.body.classList.toggle("dark");
  localStorage.setItem('theme', 
    document.body.classList.contains('dark') ? 'dark' : 'light'
  );
}

function newChat() {
  if (chatBox) chatBox.innerHTML = "";
  if (userInput) userInput.value = "";
}

// Load saved theme
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
}
console.log("Whitebox AI Engine Initialized... ");

// 2. Test Utils (Optional, but good for debugging)
const sessionStart = Utils.formatDate(Date.now());
console.log(`Session started at: ${sessionStart}`);

// 3. Global Configuration (Example)
const appConfig = {
    version: "1.0.0",
    environment: "Development"
};

// 4. Basic Global Validation Function
window.validateUserSession = (email) => {
    if (!Utils.isValidEmail(email)) {
        console.error("Validation Error: System detected an invalid email format.");
        return false;
    }
    console.log("Email validation passed. ");
    return true;
};