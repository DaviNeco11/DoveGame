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

                // Depois de pegar os emails, apagar os forms
                var config2 = {
                    appName: "DoveGame",
                    reportName: "FirstForm_Report",
                    criteria: "(RecebeEmail != \"Invalid\")"
                };

                ZOHO.CREATOR.API.deleteRecord(config2).then(function (response) {
                    console.log("Delete form");
                    teste();
                    redirectToMenu();
                });
            });
        });
}

function teste() {
    sessionStorage.setItem('usuario', emails[0]);
    sessionStorage.setItem('userRole', userRole); // Armazena a função do usuário no sessionStorage
}

function redirectToMenu() {
    window.location.href = 'menu.html';
}

//---------------------Menu de opções-------------------------------------

document.addEventListener('DOMContentLoaded', function() {
    fetchMenu();
});

function fetchMenu() {
    function navigateTo(page) {
        console.log('Navigating to:', page); // Log para verificar a página de destino
        window.location.href = page;
    }

    function showMessage(message, callback) {
        if (confirm(message)) {
            callback();
        }
    }

    const startButton = document.getElementById('startButton');
    const configButton = document.getElementById('configButton');
    const optionId = sessionStorage.getItem('selectedOptionId'); // Certifique-se de que está pegando o ID correto
    const selectedTheme = sessionStorage.getItem('selectedTheme');

    // Garantir que userRole não seja null e normalizar para comparação
    userRole = userRole ? userRole.trim().toLowerCase() : '';
    const isAdmin = userRole === 'admin';

    console.log('optionId:', optionId);
    console.log('selectedTheme:', selectedTheme);
    console.log('userRole:', userRole);
    console.log('isAdmin:', isAdmin);
    console.log('Start Button:', startButton); // Log para verificar o botão "Iniciar"
    console.log('Config Button:', configButton); // Log para verificar o botão "Configurações"

    // Verifique se os botões existem antes de adicionar os event listeners
    if (startButton ) {
        startButton.addEventListener('click', function() {
            const targetPagemenu = this.getAttribute('data-target');
            console.log('Target Page:', targetPagemenu); // Log para verificar a página de destino
            
            if (targetPagemenu === 'index.html') {
                if (!optionId && !selectedTheme) {
                    // Caso 1: optionId e selectedTheme estão nulos
                    if (isAdmin) {
                        console.log('selectedTheme is null and user is admin. Asking to select theme.');
                        showMessage('Por favor, selecione um tema.', function() {
                            navigateTo('themeSelection.html');
                        });
                    } else {
                        console.log('selectedTheme is null and user is not admin. Asking to wait for admin.');
                        showMessage('A sessão ainda não foi criada. Por favor, aguarde o admin.', function() {
                            navigateTo('menu.html');
                        });
                    }
                } else if (!optionId) {
                    console.log('selectedTheme is null and user is not admin. Asking to wait for admin.');
                        showMessage('Você ainda não escolheu seu personagem.', function() {
                            navigateTo('index.html');
                        });
                } else if (!selectedTheme) {
                    if (isAdmin) {
                        console.log('selectedTheme is null and user is admin. Asking to select theme.');
                        showMessage('Por favor, selecione um tema.', function() {
                            navigateTo('themeSelection.html');
                        });
                    } else {
                        console.log('selectedTheme is null and user is not admin. Asking to wait for admin.');
                        showMessage('A sessão ainda não foi criada. Por favor, aguarde o admin.', function() {
                            navigateTo('menu.html');
                        });
                    }
                } else {
                    // Caso 4: optionId e selectedTheme não estão nulos
                    console.log('Both optionId and selectedTheme are not null. Redirecting to usupag.html.');
                    navigateTo('usupag.html');
                }
            } else {
                console.log('Invalid target page for startButton:', targetPagemenu);
            }
        });
    } else {
        console.error('Start Button not found!');
    }

    if (configButton) {
        configButton.addEventListener('click', function() {
            const targetPageconfig = this.getAttribute('data-target');
            console.log('Navigating to config page:', targetPageconfig);
            navigateTo(targetPageconfig);
        });
    } else {
        console.error('Config Button not found!');
    }
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

    const menuOptions = document.querySelectorAll('.menu-option');
    console.log('Menu Options:', menuOptions); // Log para verificar as opções do menu

    menuOptions.forEach(option => {
        option.addEventListener('click', function() {
            const targetPage = this.getAttribute('data-target');
            console.log('Navigating to config page:', targetPage);
            window.location.href = targetPage; // Corrige a navegação
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
                window.location.href = 'config.html';
            } else {
                alert('Por favor, selecione um tema.');
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', fetchThemeData);

//--------------Pega o quadro participante-------------------------------
var nomes = [];
var IdAvatarArr = [];
var PontuacaoArr = [];
var protag = {};
var usuario = sessionStorage.getItem('usuario');

// Função para buscar dados do participante
//function fetchParticipantData() {
    ZOHO.CREATOR.init()
        .then(function (data) {
            var config = {
                appName: "DoveGame",
                reportName: "QuadroParticipante_Report"
            }
            console.log(nomes, "Chamado dentro");
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
//}

//--------------Menu de seleção-------------------------------
function handleOptionClick(optionId) {
    // Armazena o ID da opção selecionada no sessionStorage
    sessionStorage.setItem('selectedOptionId', optionId);
    alert("Você selecionou a opção com ID: " + optionId);
    window.location.href = 'config.html';
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
//------------------------------------------------------------------ -

var vetor = [90, 30, 40, 2, 15];
var nomesFake = ["ReVOLTA", "Esa", "Minerva", "Ranger", "Duds"];
// Referências aos elementos do DOM
const imagesContainer = document.getElementById("imagesContainer"); 
const generateImagesButton = document.getElementById("generateImages"); 
const moverButton = document.getElementById("mover"); 
const infoContainer = document.getElementById("infoContainer");

//----------------THEME Selection-------------------------
function themePage() {
    console.log('Current pathname:', window.location.pathname);

    if (window.location.pathname.endsWith('usupag.html')) {
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
                    backgroundImage = 'Imagens8bits/Asfalto.jpg';
                    equipamentImage = 'Imagens8bits/scooter-7827947_1280.png';
                    characterHeadImage = 'Imagens8bits/ChefeInteiro.png';
                    themeClass = 'theme1';
                    break;
                case 'tema2':
                    backgroundImage = 'Imagens8bits/Fundomontanhas8bits.jpg';
                    equipamentImage = 'Imagens8bits/aviao-removebg-preview.png';
                    characterHeadImage = 'Imagens8bits/CabecaChefe2.png';
                    themeClass = 'theme2';
                    break;
                case 'tema3':
                    backgroundImage = 'Imagens8bits/Asfalto.jpg';
                    equipamentImage = 'Imagens8bits/pixil-frame-0.png';
                    characterHeadImage = 'Imagens8bits/ChefeInteiro-removebg-preview.png';
                    themeClass = 'theme3';
                    break;
                case 'tema4':
                    backgroundImage = 'Imagens8bits/karts.jpg';
                    equipamentImage = 'Imagens8bits/Kart.png';
                    characterHeadImage = 'Imagens8bits/CabecaChefe2.png';
                    themeClass = 'theme4';
                    break;
                case 'tema5':
                    backgroundImage = 'Imagens8bits/deserto.jpg';
                    equipamentImage = 'Imagens8bits/cavalo.png';
                    characterHeadImage = 'Imagens8bits/CabecaChefe2.png';
                    themeClass = 'theme5';
                    break;
                default:
                    backgroundImage = 'Imagens8bits/Fundomontanhas8bits.jpg';
                    equipamentImage = 'Imagens8bits/scooter-7827947_1280.png';
                    characterHeadImage = 'Imagens8bits/CabecaChefe2.png';
                    themeClass = 'defaultTheme';
            }

            gameBoard.style.backgroundImage = `url(${backgroundImage})`;
            gameBoard.classList.add(themeClass);

            for (let i = 0; i < vetor.length; i++) {
                setTimeout(() => {
                    const equipamentContainer = document.createElement('div');
                    equipamentContainer.id = 'equipament-container';
                    equipamentContainer.classList.add('equipamentContainer'); // Adiciona a classe aqui
                    equipamentContainer.style.position = 'relative';
                    equipamentContainer.style.left = '10%';
                    gameBoard.appendChild(equipamentContainer);

                    const equipament = document.createElement('img');
                    equipament.id = 'equipament';
                    equipament.src = equipamentImage;
                    equipament.alt = 'Equipamento';
                    equipamentContainer.appendChild(equipament);

                    const characterHead = document.createElement('img');
                    characterHead.id = 'character-head';
                    characterHead.src = characterHeadImage;
                    characterHead.alt = 'Cabeça do personagem';
                    equipamentContainer.appendChild(characterHead);

                    setTimeout(() => {
                        equipamentContainer.classList.remove("appear");
                    }, 3000);
                }, i * 1000);
            }
            
        } else {
            console.error('Game board element not found');
        }
    } else {
        console.log('This is not the target page');
    }
}
fetchParticipantData();

function moveImages() {
    const equipamentContainers = document.getElementsByClassName('equipamentContainer');
    for (let i = 0; i < equipamentContainers.length; i++) {
        const equipamentContainer = equipamentContainers[i];
        const translateX = vetor[i] * 10;
        equipamentContainer.style.setProperty('--translate-x', `${translateX}px`);
        equipamentContainer.classList.add('move');

        setTimeout(() => {
            equipamentContainer.classList.remove('move');
            equipamentContainer.style.transform = `translateX(${translateX}px)`;
        }, 1000);
    }
}


// Move imagem
if (moverButton) {
    moverButton.addEventListener("click", () => {
        moveImages();
    });
}
