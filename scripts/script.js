/*********** Data import ***********/
import { recipesCards } from "./recipe-card-factory.js";
import { searchRecipe1 } from "./main-research-algo1.js";
import { totalNumberOfRecipeCards } from "./recipes-counter.js";
import { numberOfRecipeCards } from "./recipes-counter.js";
import { deleteInput } from "./delete-user-input.js";
import { initializeDropdown } from "./advanced-search.js";

/********** Global Variables ************/
export const searchInput = document.querySelector(".main-search__input");
export const recipeCards = document.querySelectorAll(".recipe-card");

/********** Research ***********/
searchInput.addEventListener("input", searchRecipe1);

/********** Recipes Cards counter **********/
totalNumberOfRecipeCards();
searchInput.addEventListener("input", numberOfRecipeCards);

/********** Open dropdown menus */

// initializeDropdown(
//   "dropdown-button1",
//   "dropdown-menus__bloc__details1",
//   "dropdown-menus__bloc1"
// );

// initializeDropdown(
//   "dropdown-button2",
//   "dropdown-menus__bloc__details2",
//   "dropdown-menus__bloc2"
// );

// initializeDropdown(
//   "dropdown-button3",
//   "dropdown-menus__bloc__details3",
//   "dropdown-menus__bloc3"
// );

for (let i = 1; i <= 3; i++) {
  const buttonId = `dropdown-button${i}`;
  const detailsClass = `dropdown-menus__bloc__details${i}`;
  const blocClass = `dropdown-menus__bloc${i}`;

  initializeDropdown(buttonId, detailsClass, blocClass);
}
