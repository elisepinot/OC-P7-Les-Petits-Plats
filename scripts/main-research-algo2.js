import { searchInput } from "./script.js";
import { unifiedFilter } from "./advanced-search.js";
import { currentFilters } from "./advanced-search.js";

/********** Algorithm 2: Loop ***********/

export function searchRecipe2() {
  if (searchInput.value.length >= 3) {
    currentFilters.searchText = searchInput.value.toLowerCase();
    unifiedFilter();
  }
  else if (searchInput.value.length <= 2) {
    currentFilters.searchText = "";
    unifiedFilter();
  }
}

// export function searchRecipe2() {
//   const searchTerm = searchInput.value.toLowerCase();
//   const searchTermLength = searchTerm.length;

//   if (searchTermLength >= 3) {
//     let i = 0;
//     while (i < recipeCards.length) {
//       const card = recipeCards[i];
//       const title = card
//         .querySelector(".recipe-card__details h2")
//         .textContent.toLowerCase();
//       const ingredients = Array.from(
//         card.querySelectorAll(".ingredients-section__item__title")
//       )
//         .map((ingredient) => ingredient.textContent.toLowerCase())
//         .join(" ");
//       const description = card
//         .querySelector(".recipe-card__details__process p")
//         .textContent.toLowerCase();

//       if (
//         title.includes(searchTerm) ||
//         ingredients.includes(searchTerm) ||
//         description.includes(searchTerm)
//       ) {
//         card.style.display = "block";
//       } else {
//         card.style.display = "none";
//       }

//       i++;
//     }
//   } else {
//     let i = 0;
//     while (i < recipeCards.length) {
//       recipeCards[i].style.display = "block";
//       i++;
//     }
//   }
// }
