document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll("nav ul li a");
    const pages = document.querySelectorAll(".page");
    const menuBtn = document.querySelector(".menu-btn");
    const navList = document.querySelector(".navbar ul");
    const activePageText = document.getElementById("active-page");

    // Fonction pour mettre à jour le texte du bouton de menu
    function updateMenuButtonText(activePageName) {
        activePageText.textContent = activePageName;
    }

    // Fonction pour mettre à jour le titre de la page et l'URL
    function updatePageTitleAndURL(targetPageName) {
        document.title = "Tam DINH - " + targetPageName;
        history.pushState({}, "", "#" + targetPageName.toLowerCase());
    }

    // Affiche la page d'accueil par défaut
    const defaultPage = document.getElementById("home");
    defaultPage.style.display = "block";
    defaultPage.style.opacity = 1;
    updateMenuButtonText("Home");
    updatePageTitleAndURL("Home");

    // Écouteur d'événement pour le menu burger
    menuBtn.addEventListener("click", () => {
        navList.classList.toggle("active");
    });

    // Écouteur d'événement pour la navigationa
    navLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const targetId = link.getAttribute("href").substring(1);

            // Masque toutes les pages avec une animation de transition
            pages.forEach((page) => {
                page.style.display = "none";
                page.style.opacity = 0;
            });

            // Affiche la page cible avec une animation de transition
            const targetPage = document.getElementById(targetId);
            targetPage.style.display = "block";
            setTimeout(() => {
                targetPage.style.opacity = 1;
            }, 10);

            // Met à jour le texte du bouton du menu avec le nom de la page active
            updateMenuButtonText(link.textContent);

            // Met à jour le titre de la page et l'URL en fonction de la page active
            updatePageTitleAndURL(link.textContent);
            
            // Ferme le menu burger (pour les petits écrans)
            navList.classList.remove("active");
        });
    });
});