// Abrir o modal quando clicar na div
var modal = document.getElementById("myModal");
var btn = document.getElementById("openModalBtn");
var span = document.getElementsByClassName("close")[0];

// Quando o botão é clicado, o modal aparece
btn.onclick = function() {
    modal.style.display = "flex"; // Usando flex para centralizar o modal
}

// Quando o usuário clica no "X", o modal fecha
span.onclick = function() {
    modal.style.display = "none";
}