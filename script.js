let titel = [];
let notiz = [];
let trash = [];
load();

function render() {
    let content = document.getElementById('content');
    content.innerHTML = '';
    content.innerHTML += `<h2>Meine Notizen</h2>`;
    content.innerHTML += containerTemplate(); 

    for (let i = 0; i < titel.length; i++) {
        const titels = titel[i];
        const notizs = notiz[i];

        content.innerHTML += notizContTemplate(titels, notizs, i);
    }

    renderTrashCan();

}

function setTextWithWhiteSpace(text) {
    let textarea = document.getElementById("notiz");
    textarea.textContent = text;
}

function containerTemplate() {
    return  `
        <div class="inputContainer">
            <input placeholder="Titel" id="titel">
            <textarea placeholder="Notiz" id="notiz"></textarea>
            <button onclick="addNotiz()">Notiz speichern</button>
            <button onclick="deleteAll()">Alle Einträge löschen</button>
        </div>
        `
}

function notizContTemplate(titels, notizs, i) {
    return `
        <div class="notizContainer">
            <b><u> ${titels} </u></b> <br>
            <br>
            ${notizs} <br>
            <br>
            <button onclick="deleteNotiz(${i})">Löschen</button>
        </div>        
        `
}

function addNotiz() {
    let titelInput = document.getElementById('titel');
    let notizInput = document.getElementById('notiz');

    let titelValue = titelInput.value.trim();
    let notizValue = notizInput.value.trim();

    if(titelValue === '' || notizValue === '') {
        alert('Bitte alle Felder ausfüllen');
        return;
    }

    titel.push(titelInput.value);
    notiz.push(notizInput.value);
    render();
    save();
}

function deleteNotiz(i) {
    trash.push({ titel: titel[i], notiz: notiz[i] });
    titel.splice(i, 1);
    notiz.splice(i, 1);
    render();
    save();
    renderTrashCan();
}

function deleteAll() {
    trash.push(...titel.map((t, i) => ({ titel: titel[i], notiz: notiz[i] })));
    titel.length = 0; // Leere das Array 'titel'
    notiz.length = 0; // Leere das Array 'notiz'
    render();
    save();
    renderTrashCan();
}

function renderTrashCan() {
    let trashCanContent = document.getElementById('waste');
    trashCanContent.innerHTML = ''; // Leeren Sie den Inhalt des wastes
    // Rendern Sie jeden gelöschten Eintrag im waste
    trash.forEach((eintrag, index) => {
        trashCanContent.innerHTML += trashCanTemplate(eintrag, index);
    });
}

function trashCanTemplate(eintrag, index) {
    return  `
            <div class="trashCanEntry">
                <b>${eintrag.titel}</b><br>
                ${eintrag.notiz}<br>
                <button onclick="restoreEntry(${index})">Wiederherstellen</button>
                <button onclick="permanentlyDelete(${index})">Endgültig löschen</button>
            </div>
        `
}

function restoreEntry(index) {
    // Eintrag aus dem waste wiederherstellen
    titel.push(trash[index].titel);
    notiz.push(trash[index].notiz);
    // Gelöschten Eintrag aus dem waste entfernen
    trash.splice(index, 1);
    render();
}

function permanentlyDelete(index) {
    // Eintrag endgültig aus dem waste entfernen
    trash.splice(index, 1);
    renderTrashCan(); // waste neu rendern
}

function save() {
    let titelAssText = JSON.stringify(titel);
    localStorage.setItem('titel', titelAssText);

    let notizAssText = JSON.stringify(notiz);
    localStorage.setItem('notiz', notizAssText);
}

function load() {
    let titelAssText = localStorage.getItem('titel');
    let notizAssText = localStorage.getItem('notiz');

    if (titelAssText && notizAssText) {

        titel = JSON.parse(titelAssText);
        notiz = JSON.parse(notizAssText);
    }
}

function showMenu() {
    document.getElementById('menu').classList.add('show-overlay-menu');
}

function closeMenu() {
    document.getElementById('menu').classList.remove('show-overlay-menu');
}
