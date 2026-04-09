// 🚀 Page Load
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("chatForm");

  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      const input = document.getElementById("userInput");
      const text = input.value.trim();

      if (!text) return;

      // 1. User ka message screen par dikhao
      addMessage(text, "user");
      input.value = "";

      // 🤖 2. REAL AI CALL (Backend se response lo)
      const reply = await sendMessageToAI(text);
      
      // 3. Bot ka message screen par dikhao
      addMessage(reply, "bot");

      // ✨ 4. HISTORY SAVE (Naya logic yahan add kiya hai)
      saveChatToHistory(text, reply);
    });
  }

  // First message logic (Check if redirected from home)
  const firstMsg = localStorage.getItem("firstMessage");
  if (firstMsg) {
    handleFirstMessage(firstMsg);
  }
});

// 💾 Function: Save Chat to LocalStorage
function saveChatToHistory(userText, botReply) {
    // Purani history uthao (agar hai) ya empty array lo
    let history = JSON.parse(localStorage.getItem("whitebox_history")) || [];

    // Naya object banao
    const newEntry = {
        id: Date.now(), // Unique ID delete karne ke liye
        title: userText.length > 40 ? userText.substring(0, 40) + "..." : userText, 
        fullPrompt: userText,
        botResponse: botReply,
        date: new Date().toLocaleString('en-IN', { hour12: true }), // Indian Time format
        tokens: Math.floor(Math.random() * 300) + 50 // Dummy token count for Whitebox feel
    };

    // Array ke shuruat mein dalo (taaki Latest chat hamesha top par dikhe)
    history.unshift(newEntry);

    // Max 50 chats save rakho (Browser memory limit ki wajah se)
    if (history.length > 50) history.pop();

    // LocalStorage mein save kar do
    localStorage.setItem("whitebox_history", JSON.stringify(history));
}

// 💬 Add message to UI
function addMessage(text, type) {
  const chatBox = document.getElementById("chatBox");
  if (!chatBox) return;

  const msg = document.createElement("div");
  msg.className = "msg " + type;
  msg.innerText = text;

  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// 🤖 AI API call (Your Backend)
async function sendMessageToAI(message) {
    try {
        // 1. Language preference uthao
       const selectedLang = localStorage.getItem("appLangName") || "English";
        console.log("Selected Language for AI:", selectedLang);
        // 2. AI ke liye instruction taiyar karo
       const promptForAI = `System Instruction: You must respond to the user ONLY in ${selectedLang}. Do not use English if another language is selected. User says: ${message}`;

        const response = await fetch("http://localhost:5000/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                // 3. Yahan 'message' ki jagah 'promptForAI' bhejo
                message: promptForAI, 
                mode: "text",
                history: []
            }),
        });

        const data = await response.json();
        return data.reply || "No response from AI.";

    } catch (err) {
        console.error("Error:", err);
        return "⚠️ Backend connect nahi hua! Make sure your server is running.";
    }
}
// 🕒 Handle First Message from Home
async function handleFirstMessage(text) {
    addMessage(text, "user");
    localStorage.removeItem("firstMessage");
    
    const reply = await sendMessageToAI(text);
    addMessage(reply, "bot");
    saveChatToHistory(text, reply);
}

// -------------------------------
// 🧭 Navigation & UI Functions
// -------------------------------

function newChat() {
  document.getElementById("chatBox").innerHTML = "";
}

function toggleTheme() {
  document.body.classList.toggle("dark");
}

function openHistory() {
  window.location.href = "history.html"; // Alert ki jagah direct link
}

function openModels() {
  window.location.href = "models.html"; // Direct link
}

function openDocs() {
  window.location.href = "docs.html";
}

function openAccount() {
  window.location.href = "login.html";
}
// Default placeholder functions for others
function openFeatures() { alert("Features coming soon 🚀"); }
function openTools() { alert("Tools coming soon 🛠"); }
function openDeveloper() { alert("Developer panel coming soon 👨‍💻"); }
function openSettings() { alert("Settings coming soon ⚙️"); }
// -------------------------------
// Three-dot dropdown logic
// -------------------------------
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector(".menu-btn");
  const dropdown = document.querySelector(".dropdown");

  if (menuBtn && dropdown) {
    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
    });

    document.addEventListener("click", () => {
      dropdown.style.display = "none";
    });
  }
});
const micBtn = document.getElementById('micBtn');
const userInput = document.getElementById('userInput');

// Check karo ki browser support karta hai ya nahi
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US'; // Hindi ke liye 'hi-IN' kar sakte ho
    recognition.interimResults = false;

     const btnElement = document.getElementById('sendBtn'); // <--- Apni asli ID yahan likho
if (btnElement) {
    btnElement.addEventListener('click', () => {
      recognition.start();
        micBtn.style.backgroundColor = "#ff4d4d"; // Red color jab listen kar raha ho
        console.log("Listening...");
    });
    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        userInput.value = transcript; // Jo bola wo input mein aa jayega
        micBtn.style.backgroundColor = ""; // Normal color wapas
        
        // Option: Automatically send message after speaking
        // sendMessage(); 
    };

    recognition.onspeechend = () => {
        recognition.stop();
        micBtn.style.backgroundColor = "";
    };

    recognition.onerror = (event) => {
        console.log("Error occurred in recognition: " + event.error);
        micBtn.style.backgroundColor = "";
        alert("Mic error: " + event.error);
    };

  } else {
    console.log("Speech Recognition not supported in this browser.");
    if (micBtn) micBtn.style.display = "none";
  }
// Ye function chips par click karte hi text input mein daal dega
function setQuery(text) {
  const input = document.getElementById('userInput');
  if (input) {
    input.value = text;
    input.focus(); // Cursor ko automatic input box mein le jayega
  }
}
// 1. Message ko browser memory (localStorage) mein save karne ke liye
function saveMessage(text, sender) {
    let chatHistory = JSON.parse(localStorage.getItem("whiteboxHistory")) || [];
    chatHistory.push({ 
        text: text, 
        sender: sender, 
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    });
    localStorage.setItem("whiteboxHistory", JSON.stringify(chatHistory));
}

// 2. History button dabane par purani chat dikhane ke liye
function history() {
    const chatBox = document.getElementById("chatBox");
    if (!chatBox) return;

    // Screen saaf karke history header dikhao
    chatBox.innerHTML = "<div style='text-align:center; color:#888; margin: 20px 0;'>--- Past History ---</div>";
    
    let historyData = JSON.parse(localStorage.getItem("whiteboxHistory")) || [];
    
    if (historyData.length === 0) {
        chatBox.innerHTML += "<p style='text-align:center; color:#999;'>Koi purani chat nahi mili!</p>";
        return;
    }

    // Saare saved messages ko screen par wapas laao
    historyData.forEach(item => {
        const msgDiv = document.createElement("div");
        msgDiv.className = `message ${item.sender}`;
        msgDiv.innerHTML = `<small style="font-size:10px; display:block; opacity:0.5;">${item.timestamp}</small>${item.text}`;
        chatBox.appendChild(msgDiv);
    });
    
    chatBox.scrollTop = chatBox.scrollHeight;
}
// 3. New Chat button ke liye logic (Screen clear karega)
function newChat() {
    const chatBox = document.getElementById("chatBox");
    if (chatBox) chatBox.innerHTML = "";
    
    // Suggestions ko wapas dikhao
    const suggestions = document.getElementById("suggestions");
    if (suggestions) suggestions.style.display = "flex";
}
}