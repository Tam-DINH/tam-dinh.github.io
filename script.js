document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll("nav ul li a");
  const pages = document.querySelectorAll(".page");
  const menuBtn = document.querySelector(".menu-btn");
  const navList = document.querySelector(".navbar ul");
  const activePageText = document.getElementById("active-page");
  const overlay = document.querySelector('.overlay');
  const popupButtons = document.querySelectorAll('.popup-button');

  let isMenuOpen = false; // Variable to track menu state

  // Function to update the text of the menu button
  function updateMenuButtonText(activePageName) {
    activePageText.textContent = activePageName;
  }

  // Function to update the title of the page and URL
  function updatePageTitleAndURL(targetPageName) {
    document.title = "Tam DINH - " + targetPageName;
    history.pushState({}, "", "#" + targetPageName.toLowerCase());
  }

  // Function to show a page by ID
  function showPage(pageId) {
    pages.forEach((page) => {
      page.style.display = "none";
      page.style.opacity = 0;
    });

    const targetPage = document.getElementById(pageId);
    targetPage.style.display = "block";
    setTimeout(() => {
      targetPage.style.opacity = 1;
    }, 10);
  }

  // Show the default page
  const defaultPageId = "home";
  showPage(defaultPageId);
  updateMenuButtonText("Home");
  updatePageTitleAndURL("Home");

  // Event listener for the menu burger
  menuBtn.addEventListener("click", () => {
    navList.classList.toggle("active");
    $("#content-wrapper").toggleClass("menu-open"); // Toggle the menu-open class using jQuery
    
    // Toggle menu state
    isMenuOpen = !isMenuOpen;

    // Close the menu on smaller screens when clicking outside
    if (!isMenuOpen) {
      overlay.style.display = 'none';
    }
  });

  // Event listener for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      showPage(targetId);
      updateMenuButtonText(link.textContent);
      updatePageTitleAndURL(link.textContent);
      
      // Close the menu on smaller screens
      if (isMenuOpen) {
        menuBtn.click(); // Simulate a click on the menu button to close it
      }
    });
  });

  // Event listener for popup buttons
  popupButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      const popup = this.parentElement.querySelector('.popup-content');
      popup.style.display = 'block';
      overlay.style.display = 'block';
    });
  });

  // Event listener for closing the pop-up
  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('close-popup')) {
      const popup = e.target.closest('.popup-content');
      popup.style.display = 'none';
      overlay.style.display = 'none';
    }
  });

  // Event listener to close the pop-up when overlay is clicked
  overlay.addEventListener('click', function () {
    popupButtons.forEach(function (button) {
      const popup = button.parentElement.querySelector('.popup-content');
      popup.style.display = 'none';
    });
    overlay.style.display = 'none';
  });

  // Event listener for window resize to handle desktop view
  const $contentWrapper = $("#content-wrapper");
  const desktopBreakpoint = 768; // Adjust this breakpoint as needed

  $(window).resize(function () {
    const windowWidth = $(window).width();
    if (windowWidth >= desktopBreakpoint) {
      $contentWrapper.removeClass("menu-open");
      $contentWrapper.css("margin-top", "0");
      isMenuOpen = false; // Ensure menu state is closed on resize to desktop view
    }
  });
});