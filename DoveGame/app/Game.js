document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');

    // Log do caminho atual da página
    console.log('Current pathname:', window.location.pathname);

    // Verifica se estamos na página usupag.html
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

            switch(selectedTheme) {
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
                    characterHeadImage = 'Imagens8bits/CabecaChefe2.png';
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

            // Adiciona evento de clique para mover o equipamento para a esquerda
            equipamentContainer.addEventListener('click', function() {
                const currentLeft = equipamentContainer.style.left ? parseInt(equipamentContainer.style.left) : 50;
                equipamentContainer.style.left = (currentLeft - 10) + '%'; // Move o equipamento 10% para a esquerda
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
