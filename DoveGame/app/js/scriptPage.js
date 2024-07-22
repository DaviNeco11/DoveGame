var emails = [];
var userRole = 'admin'; // Ajuste conforme necessário

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
        sessionStorage.setItem('userRole', userRole); // Armazena a função do usuário no sessionStorage
        return 1;
    }


        window.location.href = 'menu.html';
}

//---------------------Menu de opções-------------------------------------

function fetchMenu() {

    function navigateTo(page) {
        console.log('Navigating to:', page); // Log para verificar a página de destino
        window.location.href = page;
    }

    const menuOptions = document.querySelectorAll('.menu-option');
    console.log('Menu Options:', menuOptions); // Log para verificar as opções do menu

    menuOptions.forEach(option => {
        option.addEventListener('click', function() {
            const targetPage = this.getAttribute('data-target');
            console.log('Target Page:', targetPage); // Log para verificar a página de destino
            navigateTo(targetPage);
        });
    });
}

//-------------Configurações---------------------------------------------

function fetchConfig() {
    console.log('User Role:', userRole); // Adicione este log para verificar o valor

    // Verifica se o usuário é admin e exibe/oculta o botão "Escolher Tema"
    const themeButton = document.getElementById('themeButton');
    if (themeButton) {
        if (userRole === 'admin') {
            themeButton.style.display = 'block';
        } else {
            themeButton.style.display = 'none';
        }
    }

    function navigateTo(page) {
        console.log('Navigating to:', page); // Log para verificar a página de destino
        window.location.href = page;
    }

    const menuOptions = document.querySelectorAll('.menu-option');
    console.log('Menu Options:', menuOptions); // Log para verificar as opções do menu

    menuOptions.forEach(option => {
        option.addEventListener('click', function() {
            const targetPage = this.getAttribute('data-target');
            console.log('Target Page:', targetPage); // Log para verificar a página de destino
            navigateTo(targetPage);
        });
    });
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

//----------------THEME Selection-------------------------
function themePage() {
    document.addEventListener('DOMContentLoaded', function () {
        console.log('DOM fully loaded and parsed');
    
        // Log do caminho atual da página
        console.log('Current pathname:', window.location.pathname);
    
        // Verifica se estamos na página usupag.html
        if (window.location.pathname.endsWith('../usupag.html')) {
            console.log('Correct page detected');
    
            const gameBoard = document.getElementById('game-board');
            if (gameBoard) {
                console.log('Game board element found');
    
                const selectedTheme = sessionStorage.getItem('selectedTheme');
                console.log('Selected theme:', selectedTheme);
    
                let backgroundImage = '';
                let equipamentImage = '';
                let characterHeadImage = '';
                let themeClass = '';
    
                switch (selectedTheme) {
                    case 'tema1':
                        backgroundImage = '../Imagens8bits/Asfalto.jpg';
                        equipamentImage = '../Imagens8bits/scooter-7827947_1280.png';
                        characterHeadImage = '../Imagens8bits/ChefeInteiro.png';
                        themeClass = 'theme1';
                        break;
                    case 'tema2':
                        backgroundImage = '../Imagens8bits/Fundomontanhas8bits.jpg';
                        equipamentImage = '../Imagens8bits/aviao-removebg-preview.png';
                        characterHeadImage = '../Imagens8bits/CabecaChefe2.png';
                        themeClass = 'theme2';
                        break;
                    case 'tema3':
                        backgroundImage = '../Imagens8bits/Asfalto.jpg';
                        equipamentImage = '../Imagens8bits/pixil-frame-0.png';
                        characterHeadImage = '../Imagens8bits/ChefeInteiro-removebg-preview.png';
                        themeClass = 'theme3';
                        break;
                    case 'tema4':
                        backgroundImage = '../Imagens8bits/karts.jpg';
                        equipamentImage = '../Imagens8bits/Kart.png';
                        characterHeadImage = '../Imagens8bits/CabecaChefe2.png';
                        themeClass = 'theme4';
                        break;
                    case 'tema5':
                        backgroundImage = '../Imagens8bits/deserto.jpg';
                        equipamentImage = '../Imagens8bits/cavalo.png';
                        characterHeadImage = '../Imagens8bits/CabecaChefe2.png';
                        themeClass = 'theme5';
                        break;
                    default:
                        backgroundImage = '../Imagens8bits/Fundomontanhas8bits.jpg';
                        equipamentImage = '../Imagens8bits/scooter-7827947_1280.png';
                        characterHeadImage = '../Imagens8bits/CabecaChefe2.png';
                        themeClass = 'defaultTheme';
                }
    
                // Define a imagem de fundo do game board
                gameBoard.style.backgroundImage = `url(${backgroundImage})`;
                gameBoard.classList.add(themeClass);
    
                // Adiciona o container do equipamento
                const equipamentContainer = document.createElement('div');
                equipamentContainer.id = 'equipament-container';
                gameBoard.appendChild(equipamentContainer);
    
                // Adiciona a imagem do equipamento
                const equipament = document.createElement('img');
                equipament.id = 'equipament';
                equipament.src = equipamentImage;
                equipament.alt = 'Equipamento'; // Adiciona um texto alternativo para acessibilidade
                equipamentContainer.appendChild(equipament);
    
                // Adiciona a cabeça do personagem sobre o equipamento
                const characterHead = document.createElement('img');
                characterHead.id = 'character-head';
                characterHead.src = characterHeadImage;
                characterHead.alt = 'Cabeça do personagem'; // Adiciona um texto alternativo para acessibilidade
                equipamentContainer.appendChild(characterHead);
    
                // Adiciona evento de clique para mover o equipamento para a direita
                equipamentContainer.addEventListener('click', function () {
                    const currentLeft = equipamentContainer.style.left ? parseInt(equipamentContainer.style.left) : 10;
                    equipamentContainer.style.left = (currentLeft + 10) + '%'; // Move o equipamento 10% para a direita
                });
    
                // Adiciona log para verificar se a imagem está sendo carregada
                equipament.onload = function () {
                    console.log('Imagem do equipamento carregada com sucesso.');
                };
                equipament.onerror = function () {
                    console.error('Erro ao carregar a imagem do equipamento.');
                };
                characterHead.onload = function () {
                    console.log('Imagem da cabeça do personagem carregada com sucesso.');
                };
                characterHead.onerror = function () {
                    console.error('Erro ao carregar a imagem da cabeça do personagem.');
                };
            } else {
                console.error('Game board element not found');
            }
        } else {
            console.log('This is not the target page');
        }
    });
}
