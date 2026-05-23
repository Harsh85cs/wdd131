/* ==========================================================
   WDD 131 – getdates.js
   Inserta dinámicamente el año actual y la fecha de última
   modificación del documento en el pie de página.
   ========================================================== */

// Año actual en el pie de página
const currentYear = new Date().getFullYear();
document.getElementById("currentyear").textContent = currentYear;

// Fecha de última modificación del documento
document.getElementById("lastModified").innerHTML =
    "Última modificación: " + document.lastModified;
