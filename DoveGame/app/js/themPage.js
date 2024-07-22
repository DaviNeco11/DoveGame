document.addEventListener('DOMContentLoaded', function() {
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
                //alert(`Tema ${selectedTheme} selecionado!`);
                // Redireciona para a página inicial ou qualquer outra página desejada
                window.location.href = 'index.html';
            } else {
                alert('Por favor, selecione um tema.');
            }
        });
    }
});
