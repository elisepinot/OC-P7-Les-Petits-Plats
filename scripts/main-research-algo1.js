/********** Data import **********/
import { searchInput } from "./script.js";
import { unifiedFilter } from "./advanced-search.js";
import { currentFilters } from "./advanced-search.js";

/********** Algorithm 1: Array methods ***********/
export function searchRecipe1() {
  if (searchInput.value.length >= 3) {
    currentFilters.searchText = searchInput.value.toLowerCase();
    unifiedFilter();
  }
}

// export function searchRecipe1() {
//   const searchInputLowerCase = searchInput.value.toLowerCase();
//   //recipeCards: [object Nodelist]

//   if (searchInputLowerCase.length >= 3) {
//     visibleCards();
//   } else {
//     recipeCards.forEach((card) => {
//       card.classList.add("visible");
//     });
//   }
//   filteredIngredientsList();
//   filteredAppliancesList();
//   filteredUstensilsList();
// }

// function visibleCards() {
//   const searchInputLowerCase = searchInput.value.toLowerCase();
//   recipeCards.forEach((card) => {
//     const title = card
//       .querySelector(".recipe-card__details h2")
//       .textContent.toLowerCase();
//     const ingredients = Array.from(
//       card.querySelectorAll(".ingredients-section__item__title")
//     )
//       .map((ingredient) => ingredient.textContent.toLowerCase())
//       .join(" ");
//     const description = card
//       .querySelector(".recipe-card__details__process p")
//       .textContent.toLowerCase();

//     if (
//       title.includes(searchInputLowerCase) ||
//       ingredients.includes(searchInputLowerCase) ||
//       description.includes(searchInputLowerCase)
//     ) {
//       card.classList.add("visible");
//     } else {
//       card.classList.remove("visible");
//     }
//   });
// }
