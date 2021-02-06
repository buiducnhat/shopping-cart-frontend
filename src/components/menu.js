const body = document.body;
const mobileMenuTrigger = document.getElementById('mobile-menu-trigger');
const desktopMenu = document.getElementById('desktop-menu');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuTrigger.addEventListener('click', () => {
    if (mobileMenu.style.display === 'none') {
        mobileMenu.style.display = 'block';
    } else {
        mobileMenu.style.display = 'none';
    }
})

const responsiveMenu = () => {
    if (window.innerWidth < 768) {
        desktopMenu.style.display = 'none';
        mobileMenuTrigger.style.display = 'block';
    } else {
        desktopMenu.style.display = 'block';
        mobileMenuTrigger.style.display = 'none';
        mobileMenu.style.display = 'none';
    }
}

responsiveMenu();
body.onresize = () => responsiveMenu();