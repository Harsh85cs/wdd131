// Footer: copyright year and last modified date
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Modification: ${document.lastModified}`;

// Hamburger menu
const menuButton = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");

menuButton.addEventListener("click", () => {
  navigation.classList.toggle("open");
  menuButton.classList.toggle("open");

  const isOpen = navigation.classList.contains("open");
  menuButton.innerHTML = isOpen ? "&#10005;" : "&#9776;";
  menuButton.setAttribute("aria-expanded", isOpen);
});
