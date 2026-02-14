document.addEventListener('DOMContentLoaded', () => {
    const list = document.getElementById('guest-list');
    const nameInput = document.getElementById('nameInput');
    const learnInput = document.getElementById('learnInput');
    const addButton = document.getElementById('add-entry-btn');

    // Load data on startup
    loadEntries();

    // Event Listener
    addButton.addEventListener('click', handleAddEntry);

    function loadEntries() {
        const savedData = localStorage.getItem('guestbook_entries');
        if (savedData) {
            const entries = JSON.parse(savedData);
            entries.forEach(entry => renderEntry(entry.name, entry.learn));
        }
    }

    function handleAddEntry() {
        const name = nameInput.value;
        const learn = learnInput.value;

        if (validateInput(name, learn)) {
            renderEntry(name, learn);
            saveToStorage(name, learn);
            clearInputs();
        }
    }

    function validateInput(name, learn) {
        if (name === '' || learn === '') {
            alert("Please fill in both fields!");
            return false;
        }
        return true;
    }

    function renderEntry(name, learn) {
        const li = document.createElement('li');
        li.className = 'guest-entry';
        li.innerHTML = `<div class="guest-info"><strong>${name}</strong><span>Learned: ${learn}</span></div>`;
        list.appendChild(li);
    }

    function saveToStorage(name, learn) {
        let entries = [];
        const savedData = localStorage.getItem('guestbook_entries');
        if (savedData) {
            entries = JSON.parse(savedData);
        }
        entries.push({ name: name, learn: learn });
        localStorage.setItem('guestbook_entries', JSON.stringify(entries));
    }

    function clearInputs() {
        nameInput.value = '';
        learnInput.value = '';
    }
});