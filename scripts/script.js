/*********** Data import ***********/
import { recipesCards } from "./recipe-card-factory.js";
import { searchRecipe2 } from "./main-research-algo2.js";
import { numberOfRecipeCards } from "./recipes-counter.js";
import { deleteInput } from "./delete-user-input.js";
import { openCloseDropdownMenus } from "./advanced-search.js";
import { filteredIngredientsList } from "./advanced-search.js";
import { filteredAppliancesList } from "./advanced-search.js";
import { filteredUstensilsList } from "./advanced-search.js";

/********** Global Variables ************/
export const searchInput = document.querySelector(".main-search__input");
export const recipeCards = document.querySelectorAll(".recipe-card");

/********** Research ***********/
searchInput.addEventListener("input", searchRecipe2);

/********** Recipes Cards counter **********/
numberOfRecipeCards();
searchInput.addEventListener("input", numberOfRecipeCards);

/********** Open dropdown menus */

openCloseDropdownMenus();

/********** Creating dropdown menus elements **********/
filteredIngredientsList();
filteredAppliancesList();
filteredUstensilsList();
