const profileMenu = document.querySelector(".profileddtrigger");
const dropdownContainer = document.querySelector(".ddcontainer");

profileMenu.addEventListener("click", function () {
    dropdownContainer.classList.toggle("active");
});



const books = require("../../../data.json");
console.log(books);