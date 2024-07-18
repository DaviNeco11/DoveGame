var emails = [];

// Função chamada ao clicar no botão
function startProcess() {
    // Pega somente o email
    ZOHO.CREATOR.init()
        .then(function (data) {
            var config = {
                appName: "DoveGame",
                reportName: "FirstForm_Report"
            };
            ZOHO.CREATOR.API.getAllRecords(config).then(function (response) {
                var recordArr = response.data;

                for (var index in recordArr) {
                    var email = recordArr[index].RecebeEmail;
                    var displayElement = document.getElementById("display");
                    displayElement.textContent = email;
                    emails.push(email);
                }
            });
        });

    // Apaga o forms
    ZOHO.CREATOR.init()
        .then(function (data) {
            var config2 = {
                appName: "DoveGame",
                reportName: "FirstForm_Report",
                criteria: "(RecebeEmail != \"Invalid\")"
            };

            ZOHO.CREATOR.API.deleteRecord(config2).then(function (response) {
                teste();
            });
        });

    // Função para o session
    function teste() {
        sessionStorage.setItem('usuario', emails[0]);
        return 1;
    }

    // Redireciona para outra página
    window.location.href = 'themeSelection.html';
}

//--------------Função de escolha de TEMA--------------------------------

function fetchThemeData() {
    // Verifica se estamos na página de seleção de tema
    if (window.location.pathname.endsWith('themeSelection.html')) {
        const themeOptions = document.querySelectorAll('.theme-option');
        let selectedTheme = null;

        themeOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Remove a classe 'selected' de todas as opções
                themeOptions.forEach(opt => opt.classList.remove('selected'));
                // Adiciona a classe 'selected' à opção clicada
                this.classList.add('selected');
                // Guarda o tema selecionado
                selectedTheme = this.getAttribute('data-theme');
                console.log(selectedTheme);
            });
        });

        document.getElementById('startButton').addEventListener('click', function() {
            if (selectedTheme) {
                // Salva o tema selecionado no sessionStorage
                sessionStorage.setItem('selectedTheme', selectedTheme);
                // Redireciona para a página inicial ou qualquer outra página desejada
                window.location.href = 'index.html';
            } else {
                alert('Por favor, selecione um tema.');
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', fetchThemeData);

//--------------Pega o quadro partitipante-------------------------------
var nomes = [];
var emails = [];
var IdAvatarArr = [];
var PontuacaoArr = [];
var protag = {};
var usuario = sessionStorage.getItem('usuario');

// Função para buscar dados do participante
function fetchParticipantData() {
    ZOHO.CREATOR.init()
        .then(function (data) {
            var config = {
                appName: "DoveGame",
                reportName: "QuadroParticipante_Report"
            }
            console.log(nomes, "Texto do casca de bala");
            ZOHO.CREATOR.API.getAllRecords(config).then(function (response) {
                var recordArr = response.data;
                console.log(recordArr);

                for (var index in recordArr) {
                    var Nome = recordArr[index].Nome_Parti;
                    var email = recordArr[index].Email_Parti;
                    var idavatar = recordArr[index].Avatar;
                    var pontuacao = recordArr[index].Pontuacao;

                    nomes.push(Nome);
                    emails.push(email);
                    IdAvatarArr.push(idavatar);
                    PontuacaoArr.push(pontuacao);

                    console.log(nomes, "Array aqui!!!!!!!!!");

                    if (usuario == email) {
                        protag.nomeOB = Nome;
                        protag.emailOB = email;
                        protag.IDOB = idavatar;
                        console.log(protag);
                    }
                }
            });
        });
}
//--------------Menu de selecao-------------------------------
function handleOptionClick(optionId) {
    sessionStorage.setItem('selectedOptionId', optionId);
    alert("Você selecionou a opção com ID: " + optionId);

    // Redireciona para nova_pagina.html
    window.location.href = "usupag.html";
}

function initPage() {
    //--------------USU SCRIPT-------------------------------
    const selectedOptionId = sessionStorage.getItem('selectedOptionId');
    document.getElementById('selected-option').textContent = 'Você selecionou a opção com ID: ' + selectedOptionId;

    const usuario = sessionStorage.getItem('usuario');
    console.log(usuario, "SESSION AQUI");

    // Objeto do usuario
    const protag = new Object();
}

