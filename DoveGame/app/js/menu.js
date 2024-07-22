document.addEventListener('DOMContentLoaded', function() {
    // Pega a função do usuário do sessionStorage
    const userRole = sessionStorage.getItem('userRole');
    console.log('User Role:', userRole); // Adicione este log para verificar o valor

    function navigateTo(page) {
        window.location.href = page;
    }

    const menuOptions = document.querySelectorAll('.menu-option');
    menuOptions.forEach(option => {
        option.addEventListener('click', function() {
            const targetPage = this.getAttribute('data-target');
            navigateTo(targetPage);
        });
    });

    // Verifica se o usuário é admin e exibe/oculta o botão "Escolher Tema"
    const themeButton = document.getElementById('themeButton');
    if (userRole === 'admin') {
        themeButton.style.display = 'block';
    } else {
        themeButton.style.display = 'none';
    }
});
