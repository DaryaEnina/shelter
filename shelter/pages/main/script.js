import data from "./../../assets/pets.js";

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
const burgerNav = document.querySelector(".header_nav-container");
burger.addEventListener("click", function (e) {
  burger.classList.toggle("active");
  burgerNav.classList.toggle("show");
  document.body.classList.toggle("lock");
});
burgerNav.addEventListener("click", () => {
  burger.classList.toggle("active");
  burgerNav.classList.toggle("show");
  document.body.classList.toggle("lock");
});

//--------------slider---------------
const btnLeft = document.querySelector(".left");
const btnRight = document.querySelector(".right");
const slider = document.querySelector(".friends_slider");
const carousel = document.querySelector(".carousel");

function generateCard(cardNum) {
  let card = data[cardNum];

  return `<div class="friends_slider-card">
            <img src="../../assets/images/slider/${card.name.toLowerCase()}.png" alt="${card.name.toLowerCase()}">
            <p class="pet-name">${card.name}</p>
            <button class="friends_slider-card-btn">Learn more</button>
			</div>`;
}
let cardsIndex = [];

function generateCarouselCards(addCardsClass, amount, generateUnicCards) {
  let randomNums = [];

  while (randomNums.length < amount) {
    let currentNum = Math.floor(Math.random() * data.length);
    if (!randomNums.includes(currentNum) && !cardsIndex.includes(currentNum)) {
      randomNums.push(currentNum);
    }
  }

  if (generateUnicCards) {
    cardsIndex = [...randomNums];
  }

  let cards = document.createElement("div");
  cards.classList.add("carousel_cards", addCardsClass);
  for (let i = 0; i < amount; i++) {
    cards.innerHTML += generateCard(randomNums[i]);
  }

  return cards.outerHTML;
}

function generateCarouselWrappCards(amountCards) {
  carousel.insertAdjacentHTML(
    "afterbegin",
    generateCarouselCards("carousel_cards-current", amountCards, true)
  );
  carousel.insertAdjacentHTML(
    "afterbegin",
    generateCarouselCards("carousel_cards-left", amountCards)
  );
  carousel.insertAdjacentHTML(
    "beforeend",
    generateCarouselCards("carousel_cards-right", amountCards)
  );
}
if (window.innerWidth >= 1280) {
  generateCarouselWrappCards(3);
} else if (window.innerWidth >= 768 && window.innerWidth <= 1279) {
  generateCarouselWrappCards(2);
} else {
  generateCarouselWrappCards(1);
}

//animation
const moveLeft = () => {
  carousel.classList.add("transition-left");
  btnLeft.removeEventListener("click", moveLeft);
  btnRight.removeEventListener("click", moveRight);
};

const moveRight = () => {
  carousel.classList.add("transition-right");
  btnLeft.removeEventListener("click", moveLeft);
  btnRight.removeEventListener("click", moveRight);
};

btnLeft.addEventListener("click", moveLeft);
btnRight.addEventListener("click", moveRight);

slider.addEventListener("animationend", (animationEvent) => {
  if (animationEvent.animationName === "move-right") {
    carousel.classList.remove("transition-right");

    // carouselCurrent.innerHTML = carouselRight.innerHTML;
    document.querySelector(".carousel_cards-current").innerHTML =
      document.querySelector(".carousel_cards-right").innerHTML;

    if (window.innerWidth >= 1280) {
      document.querySelector(".carousel_cards-right").outerHTML =
        generateCarouselCards("carousel_cards-right", 3, true);
    } else if (window.innerWidth >= 768 && window.innerWidth <= 1279) {
      document.querySelector(".carousel_cards-right").outerHTML =
        generateCarouselCards("carousel_cards-right", 2, true);
    } else {
      document.querySelector(".carousel_cards-right").outerHTML =
        generateCarouselCards("carousel_cards-right", 1, true);
    }
  } else {
    carousel.classList.remove("transition-left");

    document.querySelector(".carousel_cards-current").innerHTML =
      document.querySelector(".carousel_cards-left").innerHTML;

    if (window.innerWidth >= 1280) {
      document.querySelector(".carousel_cards-left").outerHTML =
        generateCarouselCards("carousel_cards-left", 3, true);
    } else if (window.innerWidth >= 768 && window.innerWidth <= 1279) {
      document.querySelector(".carousel_cards-left").outerHTML =
        generateCarouselCards("carousel_cards-left", 2, true);
    } else {
      document.querySelector(".carousel_cards-left").outerHTML =
        generateCarouselCards("carousel_cards-left", 1, true);
    }
  }

  btnLeft.addEventListener("click", moveLeft);
  btnRight.addEventListener("click", moveRight);
});

//------------modal-----------

const modal = document.querySelector(".modal");
const modalWrapp = document.querySelector(".modal_wrapper");
const modalBtn = document.querySelector(".modal_button");

function closeModal() {
  modal.classList.remove("modal-active");
  document.querySelector("body").classList.remove("lock_modal");
}
modalBtn.addEventListener("click", closeModal);
modal.addEventListener("click", closeModal);

slider.addEventListener("click", (event) => {
  let card = event.target.closest(".friends_slider-card");

  if (card) {
    modalWrapp.querySelector(".modal_content").outerHTML = "";
    modal.classList.add("modal-active");
    document.querySelector("body").classList.toggle("lock_modal");

    let cardNamePet = card.querySelector(".pet-name").textContent;

    let newCard = document.createElement("div");
    newCard.classList.add("modal_content");

    data.filter((currentCard) => {
      if (currentCard.name === cardNamePet) {
        newCard.innerHTML = `
        <img class="modal_img" src="../../assets/images/slider/${currentCard.name.toLowerCase()}.png" alt="${
          currentCard.name
        }">
              <div class="modal_info">
                <h3 class="modal_name">${currentCard.name}</h3>
                <h4 class="modal_fullname">${currentCard.type}</h4>
                <h5 class="modal_description">${currentCard.description}</h5>
                <ul class="modal_items">
                  <li class="modal_items-item">
                  <span class="description">Age:</span> 
                  ${currentCard.age}
                  </li>
                  <li class="modal_items-item">
                  <span class="description">Inoculations:</span>
                  ${currentCard.inoculations}
                  </li>
                  <li class="modal_items-item">
                  <span class="description">Diseases:</span>
                  ${currentCard.diseases}
                  </li>
                  <li class="modal_items-item">
                  <span class="description">Parasites:</span>
                  ${currentCard.parasites}
                  </li>
                </ul>
              </div>
        `;
        modalWrapp.append(newCard);
      }
    });
  }
});
modalWrapp.addEventListener("click", (e) => e.stopPropagation());

console.log(`
Моя отметка- 90 балла(ов)
Отзыв по пунктам ТЗ:

Частично выполненные пункты:
1) Проверка выполнения указанных для Carousel требований —  - 5 балл(а)
Комментарий проверяющего: Контент повторяеся
Не сохраняется предыдущий блок
2) Проверка выполнения указанных для Pagination требований —  -5 балл(а)
Комментарий проверяющего: Не формируется псевдослучайный набор питовцев 


`);
