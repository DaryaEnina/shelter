document.querySelector(".friends_btn").addEventListener("click", () => {
  window.location.href =
    "https://rolling-scopes-school.github.io/daryaenina-JSFE2022Q1/shelter/pages/pets";
});
document.querySelector(".header_logo").addEventListener("click", () => {
  window.location.href =
    "https://rolling-scopes-school.github.io/daryaenina-JSFE2022Q1/shelter/pages/pets";
});
//Burger
const burger = document.querySelector(".burger-menu");
const burgerNav = document.querySelector(".header_nav");
burger.addEventListener("click", function (e) {
  burger.classList.toggle("active");
});
