// ===== Footer: copyright year and last modified date =====
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Modification: ${document.lastModified}`;

// ===== Hamburger menu =====
const menuButton = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");

menuButton.addEventListener("click", () => {
  navigation.classList.toggle("open");
  menuButton.classList.toggle("open");

  const isOpen = navigation.classList.contains("open");
  menuButton.innerHTML = isOpen ? "&#10005;" : "&#9776;";
  menuButton.setAttribute("aria-expanded", isOpen);
});

// ===== Temple data =====
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
  // Added temples
  {
    templeName: "Monterrey Mexico",
    location: "Monterrey, Nuevo León, Mexico",
    dedicated: "2002, April, 28",
    area: 16498,
    imageUrl:
    "https://newsroom.churchofjesuschrist.org/media/640x480/Monterrey-Mexico-Temple1.jpg"
  },
  {
    templeName: "Salt Lake",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 6",
    area: 382207,
    imageUrl:
    "https://newsroom.churchofjesuschrist.org/media/640x480/SL-Temple2.jpg"
  },
  {
    templeName: "Rome Italy",
    location: "Rome, Italy",
    dedicated: "2019, March, 10",
    area: 41010,
    imageUrl:
    "https://newsroom.churchofjesuschrist.org/media/640x480/rome-italy-temple-rendering.jpg"
  }
];

// ===== Build temple cards =====
const album = document.querySelector(".album");
const pageTitle = document.querySelector("#page-title");

function createTempleCards(templeList) {
  album.innerHTML = "";

  templeList.forEach((temple) => {
    const card = document.createElement("figure");

    const img = document.createElement("img");
    img.src = temple.imageUrl;
    img.alt = `${temple.templeName} Temple`;
    img.loading = "lazy";
    img.width = 400;
    img.height = 250;

    const caption = document.createElement("figcaption");
    caption.innerHTML = `
      <h2>${temple.templeName}</h2>
      <dl class="temple-info">
        <dt>Location:</dt><dd>${temple.location}</dd>
        <dt>Dedicated:</dt><dd>${temple.dedicated}</dd>
        <dt>Size:</dt><dd>${temple.area.toLocaleString("en-US")} sq ft</dd>
      </dl>`;

    card.appendChild(img);
    card.appendChild(caption);
    album.appendChild(card);
  });
}

// ===== Filters =====
const getYear = (temple) => parseInt(temple.dedicated.split(",")[0], 10);

const filters = {
  home: { title: "Home", fn: () => true },
  old: { title: "Old", fn: (t) => getYear(t) < 1900 },
  new: { title: "New", fn: (t) => getYear(t) > 2000 },
  large: { title: "Large", fn: (t) => t.area > 90000 },
  small: { title: "Small", fn: (t) => t.area < 10000 }
};

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const filter = filters[link.id];

    navigation.querySelectorAll("a").forEach((a) => a.classList.remove("active"));
    link.classList.add("active");

    pageTitle.textContent = filter.title;
    createTempleCards(temples.filter(filter.fn));
  });
});

// Initial load: show all temples
createTempleCards(temples);
