document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('theme-toggle');

    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-theme'); // switch
    });
});
// -----------------------
// THEME TOGGLE
// -----------------------
const toggleBtn = document.getElementById('theme-toggle');
toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
});

// -----------------------
// LANGUAGE DROPDOWN FUNCTIONS (for inline onclick)
// -----------------------
function toggleLang() {
    const list = document.getElementById('langList');
    list.style.display = list.style.display === 'block' ? 'none' : 'block';
}

function selectLang(lang) {
    const selected = document.querySelector('.lang-dropdown .selected');
    
    // Find the full text with flag
    const listItems = document.getElementById('langList').children;
    for (let i = 0; i < listItems.length; i++) {
        if (listItems[i].innerText.includes(lang)) {
            selected.innerText = listItems[i].innerText; // set flag + language
            break;
        }
    }
    
    document.getElementById('langList').style.display = 'none';
}

// Click outside to close dropdown
document.addEventListener('click', function(e) {
    const dropdown = document.querySelector('.lang-dropdown');
    const list = document.getElementById('langList');
    if (!dropdown.contains(e.target)) {
        list.style.display = 'none';
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('theme-toggle');
    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-theme'); // black & white switch
    });
});