import data from "./../../assets/pets.js";

document.querySelector(".header_logo").addEventListener("click", () => {
  window.location.href =
    "https://rolling-scopes-school.github.io/daryaenina-JSFE2022Q1/shelter/pages/main";
});
//Burger
const burger = document.querySelector(".burger-menu");
const burgerNav = document.querySelector(".header_nav-container");

burger.addEventListener("click", () => {
  burger.classList.toggle("active");
  burgerNav.classList.toggle("show");
  document.body.classList.toggle("lock");
});
burgerNav.addEventListener("click", () => {
  burger.classList.toggle("active");
  burgerNav.classList.toggle("show");
  document.body.classList.toggle("lock");
});

//slider

const sliderPages = document.querySelector(".friends_slider-pages");
const counter = document.querySelector(".counter");
const btnsLeft = document.querySelectorAll(".left");
const btnsRight = document.querySelectorAll(".right");
const btns = document.querySelector(".friends_slider-pagination");

let randomCards = [];

for (let i = 0; i < 6; i++) {
  randomCards.push(...data);
}
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

function generateCardsForPage(addClass, amountCards) {
  let uniqCards = [];

  for (let i = 0; i < amountCards; i++) {
    uniqCards.push(randomCards[i]);
  }

  randomCards.splice(0, amountCards);

  shuffleArray(uniqCards);

  let cards = document.createElement("div");
  cards.classList.add("friends_slider-cards", addClass);

  for (let i = 0; i < amountCards; i++) {
    cards.innerHTML += `
    <div class="friends_slider-card">
      <img
        src="./../../assets/images/slider/${uniqCards[
          i
        ].name.toLowerCase()}.png"
        alt="card"
      />
      <p class="pet-name">${uniqCards[i].name}</p>
      <button class="friends_slider-card-btn">Learn more</button>
    </div>`;
  }

  return cards.outerHTML;
}

function generateCardsForPages(amountPages, amountCards) {
  for (let i = 0; i < amountPages; i++) {
    sliderPages.insertAdjacentHTML(
      "afterbegin",
      generateCardsForPage("friends_slider-cards", amountCards)
    );
  }
}
if (window.innerWidth >= 1280) {
  generateCardsForPages(6, 8);
} else if (window.innerWidth >= 768 && window.innerWidth <= 1279) {
  generateCardsForPages(8, 6);
} else {
  generateCardsForPages(16, 3);
}

function addActive(elements) {
  elements.forEach((button) => {
    button.classList.remove("disabled");
    button.classList.add("active");
  });
}

function addDisabled(elements) {
  elements.forEach((button) => {
    button.classList.add("disabled");
    button.classList.remove("active");
  });
}
function rightButtonClick(width, amountPages, position) {
  if (position % width === 0) {
    sliderPages.style.left = `${position - width}px`;

    if (position <= -((amountPages - 2) * width)) {
      addDisabled(btnsRight);
    }
    counter.textContent = +counter.textContent + 1;
    addActive(btnsLeft);
  }
}
function leftButtonClick(width, position) {
  if (position % width === 0) {
    if (position >= -width) {
      addDisabled(btnsLeft);
    }
    addActive(btnsRight);

    sliderPages.style.left = `${position + width}px`;
    counter.textContent = +counter.textContent - 1;
  }
}
function rightButtonDoubleClick(width, amountPages) {
  addDisabled(btnsRight);
  addActive(btnsLeft);
  counter.textContent = amountPages;
  sliderPages.style.left = `-${(amountPages - 1) * width}px`;
}
function leftButtonDoubleClick() {
  addDisabled(btnsLeft);
  addActive(btnsRight);
  counter.textContent = "1";
  sliderPages.style.left = `0px`;
}

function loadPage(button, width, amountPages) {
  let position = +window.getComputedStyle(sliderPages).left.slice(0, -2);

  if (
    !button.classList.contains("disabled") &&
    button.classList.contains("right")
  ) {
    rightButtonClick(width, amountPages, position);
  }
  if (
    !button.classList.contains("disabled") &&
    button.classList.contains("right") &&
    button.classList.contains("double")
  ) {
    rightButtonDoubleClick(width, amountPages);
  }
  if (
    !button.classList.contains("disabled") &&
    button.classList.contains("left")
  ) {
    leftButtonClick(width, position);
  }
  if (
    !button.classList.contains("disabled") &&
    button.classList.contains("left") &&
    button.classList.contains("double")
  ) {
    leftButtonDoubleClick();
  }
}

btns.addEventListener("click", (event) => {
  let button;
  if (event.target.classList.contains("btn")) {
    button = event.target;
  } else {
    return;
  }
  if (window.innerWidth >= 1280) {
    loadPage(button, 1240, 6);
  } else if (window.innerWidth >= 768 && window.innerWidth <= 1279) {
    loadPage(button, 623, 8);
  } else {
    loadPage(button, 310, 16);
  }
});

//------------modal-----------

const modal = document.querySelector(".modal");
const modalWrapp = document.querySelector(".modal_wrapper");
const modalBtn = document.querySelector(".modal_button");
const modalContent = document.querySelector(".modal_content");

function closeModal() {
  modal.classList.remove("modal-active");
  document.querySelector("body").classList.remove("lock_modal");
}
modalBtn.addEventListener("click", closeModal);
modal.addEventListener("click", closeModal);

sliderPages.addEventListener("click", (event) => {
  let card = event.target.closest(".friends_slider-card");
  console.log(card);
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
