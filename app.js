// Charger les mots depuis le stockage local
window.onload = function () {
    loadWords();
};
  
  document.getElementById("foreignWord").addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("translation").focus();
      }
    });
  
      document
    .getElementById("translation")
    .addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        addWord();
        document.getElementById("foreignWord").focus();
      }
    });
  
function addWord() {
        var foreignWord = document.getElementById("foreignWord").value;
        var translation = document.getElementById("translation").value;
        if (foreignWord && translation) {
          var tableBody = document.getElementById("vocabTableBody");
          var newRow = tableBody.insertRow();
          var cell1 = newRow.insertCell(0);
          var cell2 = newRow.insertCell(1);
          var cell3 = newRow.insertCell(2);
          cell1.textContent = foreignWord;
          cell2.textContent = translation;
          cell2.classList.add("translation");
      
          // Créer le bouton de suppression avec style
          var deleteButton = createDeleteButton(foreignWord, newRow, tableBody);
          cell3.appendChild(deleteButton);
      
          // Enregistrer le mot dans le stockage local
          saveWord(foreignWord, translation);
      
          document.getElementById("foreignWord").value = "";
          document.getElementById("translation").value = "";
          document.getElementById("foreignWord").focus();
        }
  }
      
  
function toggleTranslations() {
    var translations = document.querySelectorAll(".translation");
    translations.forEach(function (cell) {
      cell.classList.toggle("hidden");
    });
}
  
function saveWord(foreignWord, translation) {
    var words = JSON.parse(localStorage.getItem("words")) || [];
    words.push({ foreignWord: foreignWord, translation: translation });
    localStorage.setItem("words", JSON.stringify(words));
}
  
function loadWords() {
    var words = JSON.parse(localStorage.getItem("words")) || [];
    var tableBody = document.getElementById("vocabTableBody");
    words.forEach(function (word) {
      var newRow = tableBody.insertRow();
      var cell1 = newRow.insertCell(0);
      var cell2 = newRow.insertCell(1);
      var cell3 = newRow.insertCell(2);
      cell1.textContent = word.foreignWord;
      cell2.textContent = word.translation;
      cell2.classList.add("translation");
  
      // Utiliser la fonction createDeleteButton pour recréer le bouton stylé
      var deleteButton = createDeleteButton(word.foreignWord, newRow, tableBody);
      cell3.appendChild(deleteButton);
    });
}


function deleteWord(foreignWord) {
    // Mettre à jour le stockage local en supprimant le mot
    var words = JSON.parse(localStorage.getItem("words")) || [];
    words = words.filter(function (word) {
      return word.foreignWord !== foreignWord;
    });
    localStorage.setItem("words", JSON.stringify(words));
  }
  
function createDeleteButton(foreignWord, newRow, tableBody) {
    var deleteButton = document.createElement("button");
    deleteButton.classList.add("noselect");
  
    var spanText = document.createElement("span");
    spanText.classList.add("text");
    spanText.textContent = "Delete";
  
    var spanIcon = document.createElement("span");
    spanIcon.classList.add("icon");
  
    var svgIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svgIcon.setAttribute("width", "24");
    svgIcon.setAttribute("height", "24");
    svgIcon.setAttribute("viewBox", "0 0 24 24");
  
    var svgPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    svgPath.setAttribute("d", "M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z");
    
    svgIcon.appendChild(svgPath);
    spanIcon.appendChild(svgIcon);
    
    deleteButton.appendChild(spanText);
    deleteButton.appendChild(spanIcon);
  
    deleteButton.onclick = function () {
      deleteWord(foreignWord);
      tableBody.deleteRow(newRow.rowIndex - 1); // Supprime la ligne de la table
    };
  
    return deleteButton;
  }

  
  