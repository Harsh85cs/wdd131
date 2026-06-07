const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  {
    templeName: "Salt Lake Utah",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 6",
    area: 253015,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/salt-lake-city-utah/400x250/salt-lake-temple-37762-wallpaper.jpg"
  },
  {
    templeName: "São Paulo Brazil",
    location: "São Paulo, Brazil",
    dedicated: "1978, October, 30",
    area: 59246,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/sao-paulo-brazil/400x250/sao-paulo-brazil-temple-702702-wallpaper.jpg"
  },
  {
    templeName: "Monterrey Mexico",
    location: "Monterrey, Nuevo León, Mexico",
    dedicated: "2002, April, 28",
    area: 10700,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/monterrey-mexico/400x250/monterrey-mexico-temple-background-702747-wallpaper.jpg"
  }
];

// ===== DOM References =====
const galleryDiv = document.getElementById("gallery");
const galleryTitle = document.getElementById("gallery-title");

// ===== Create Temple Cards =====
function displayTemples(filteredTemples) {
  galleryDiv.innerHTML = "";

  filteredTemples.forEach((temple) => {
    // Card container
    const card = document.createElement("figure");
    card.classList.add("temple-card");

    // Image with native lazy loading and explicit dimensions
    const img = document.createElement("img");
    img.src = temple.imageUrl;
    img.alt = temple.templeName;
    img.loading = "lazy";
    img.width = 400;
    img.height = 250;

    // Figcaption with temple details
    const caption = document.createElement("figcaption");
    caption.classList.add("card-info");

    const name = document.createElement("h3");
    name.textContent = temple.templeName;

    const location = document.createElement("p");
    location.innerHTML = `<span>Location:</span> ${temple.location}`;

    const dedicated = document.createElement("p");
    dedicated.innerHTML = `<span>Dedicated:</span> ${temple.dedicated}`;

    const area = document.createElement("p");
    area.innerHTML = `<span>Area:</span> ${temple.area.toLocaleString()} sq ft`;

    // Assemble
    caption.appendChild(name);
    caption.appendChild(location);
    caption.appendChild(dedicated);
    caption.appendChild(area);

    card.appendChild(img);
    card.appendChild(caption);

    galleryDiv.appendChild(card);
  });
}

// ===== Filter Logic =====
function getYear(dedicatedStr) {
  return parseInt(dedicatedStr.split(",")[0]);
}

function filterTemples(category) {
  switch (category) {
    case "old":
      return temples.filter((t) => getYear(t.dedicated) < 1900);
    case "new":
      return temples.filter((t) => getYear(t.dedicated) > 2000);
    case "large":
      return temples.filter((t) => t.area > 90000);
    case "small":
      return temples.filter((t) => t.area < 10000);
    default:
      return temples;
  }
}

// ===== Navigation Event Listeners =====
const titles = {
  home: "Home",
  old: "Old — Built Before 1900",
  new: "New — Built After 2000",
  large: "Large — Over 90,000 sq ft",
  small: "Small — Under 10,000 sq ft"
};

document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    // Update active class
    document.querySelector("nav a.active").classList.remove("active");
    link.classList.add("active");

    // Update title and display filtered temples
    const category = link.id;
    galleryTitle.textContent = titles[category];
    displayTemples(filterTemples(category));
  });
});

// ===== Footer: Copyright Year & Last Modified =====
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// ===== Initial Load =====
displayTemples(temples);
