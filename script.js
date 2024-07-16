//------------------------MENU-----------------------------

function handleOptionClick(optionId) {
    sessionStorage.setItem('selectedOptionId', optionId);
    alert("Você selecionou a opção com ID: " + optionId);

    // Redireciona para nova_pagina.html
    window.location.href = "usupag.html";
}