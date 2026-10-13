// Shared behavior for every page: responsive menu and footer dates.

const menuButton = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");

function toggleMenu() {
  navigation.classList.toggle("open");
  menuButton.classList.toggle("open");
  const isOpen = navigation.classList.contains("open");
  menuButton.setAttribute("aria-expanded", `${isOpen}`);
}

function setFooterDates() {
  const today = new Date();
  document.querySelector("#currentyear").textContent = `${today.getFullYear()}`;
  document.querySelector("#lastModified").textContent = `Last modified: ${document.lastModified}`;
}

menuButton.addEventListener("click", toggleMenu);
setFooterDates();
