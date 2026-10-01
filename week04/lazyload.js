// Año actual en el footer
document.getElementById("currentyear").textContent = new Date().getFullYear();

// Fecha de la última modificación del documento
document.getElementById("lastModified").textContent = `Last Modification: ${document.lastModified}`;
