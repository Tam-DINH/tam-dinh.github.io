document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll("nav ul li a");
  const pages = document.querySelectorAll(".page");
  const menuBtn = document.querySelector(".menu-btn");
  const navList = document.querySelector(".navbar ul");
  const activePageText = document.getElementById("active-page");
  const overlay = document.querySelector('.overlay');
  const popupButtons = document.querySelectorAll('.popup-button');

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
  });

  // Event listener for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      showPage(targetId);
      updateMenuButtonText(link.textContent);
      updatePageTitleAndURL(link.textContent);
      navList.classList.remove("active");
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
    }
  });

  // Event listener for resume download with permission request
  const resumeImage = document.querySelector("#resume-link img");
  resumeImage.addEventListener("click", function (event) {
    event.preventDefault();
    if (confirm("Do you want to download the resume?")) {
      const resumeLink = document.getElementById("resume-link");
      const resumeHref = resumeLink.getAttribute("href");
      const a = document.createElement("a");
      a.href = resumeHref;
      a.setAttribute("download", "Tam DINH - CV.pdf");
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  });
});