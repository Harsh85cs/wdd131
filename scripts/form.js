// Populate the Product Name select: name is displayed, id is the value
const productSelect = document.querySelector("#product");

products.forEach((product) => {
  const option = document.createElement("option");
  option.value = product.id;
  option.textContent = product.name;
  productSelect.appendChild(option);
});
