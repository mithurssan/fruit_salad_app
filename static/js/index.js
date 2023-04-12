const fruitForm = document.querySelector("#inputSection form");
const { extractFruit } = require("./fruit");


fruitForm.addEventListener("submit", extractFruit);




