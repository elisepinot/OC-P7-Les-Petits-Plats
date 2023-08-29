/*********** Data import ***********/
import { recipesCards } from "./recipe-card-factory.js";
import { totalNumberOfRecipeCards } from "./recipes-counter.js";
import { searchRecipe2 } from "./main-research-algo2.js";
import { numberOfRecipeCards } from "./recipes-counter.js";
import { deleteInput } from "./delete-user-input.js";

/********** Global Variables ************/
export const searchInput = document.querySelector(".main-search__input");
export const recipeCards = document.querySelectorAll(".recipe-card");

/********** Research ***********/
searchInput.addEventListener("input", searchRecipe2);

/********** Recipes Cards counter **********/
totalNumberOfRecipeCards();
searchInput.addEventListener("input", numberOfRecipeCards);
