import { numberOfRecipeCards } from "./recipes-counter.js";
import { searchInput } from "./script.js";
import { filteredIngredientsList } from "./advanced-search.js";
import { filteredAppliancesList } from "./advanced-search.js";
import { filteredUstensilsList } from "./advanced-search.js";
import { openCloseDropdownMenus } from "./advanced-search.js";

// import { recipesCards } from "./recipe-card-factory.js";

/********** Delete user input ***********/
const crossToDelete = document.querySelector(".main-search__delete");
crossToDelete.addEventListener("click", deleteInput);

export function deleteInput() {
  searchInput.value = "";
  const recipeCards = document.querySelectorAll(".recipe-card");
  recipeCards.forEach((card) => {
    card.classList.add("visible");
  });

  numberOfRecipeCards();
  filteredIngredientsList();
  filteredAppliancesList();
  filteredUstensilsList();
  openCloseDropdownMenus(); //ça ne fonctionne pas, les menus déroulants qui sont ouverts restent ouverts - A REVOIR
}
