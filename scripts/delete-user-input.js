import { numberOfRecipeCards } from "./recipes-counter.js";
import { searchInput } from "./script.js";

/********** Delete user input ***********/
const crossToDelete = document.querySelector(".main-search__delete");
crossToDelete.addEventListener("click", deleteInput);

export function deleteInput() {
  searchInput.value = "";
  const recipeCards = document.querySelectorAll(".recipe-card");
  recipeCards.forEach((card) => {
    card.style.display = "block";
  });
  numberOfRecipeCards();
}
