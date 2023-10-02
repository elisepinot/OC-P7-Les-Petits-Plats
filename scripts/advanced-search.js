import { recipes } from "../data/recipes.js";
import { recipeCards } from "./script.js";
import { numberOfRecipeCards } from "./recipes-counter.js";

// import { visibleCards } from "./main-research-algo1.js";

/********** Open/Close dropdown menus when clicking on the open/close button **********/
export function initializeDropdown(button, blocDetails, menuBloc) {
  const dropdownMenuBloc = document.querySelector(`.${menuBloc}`);
  const dropdownButton = document.querySelector(`.${button}`);
  const dropdownMenuDetails = document.querySelector(`.${blocDetails}`);
  let isMenuOpen = false;

  dropdownButton.addEventListener("click", () => {
    isMenuOpen = !isMenuOpen;
    dropdownMenuDetails.style.display = isMenuOpen ? "block" : "none";
    dropdownMenuBloc.classList.toggle("visible");
    dropdownMenuBloc.classList.toggle("open");
  });
}

export function openCloseDropdownMenus() {
  for (let i = 1; i <= 3; i++) {
    const buttonId = `dropdown-button${i}`;
    const detailsClass = `dropdown-menus__bloc__details${i}`;
    const blocClass = `dropdown-menus__bloc${i}`;

    initializeDropdown(buttonId, detailsClass, blocClass);
  }
}

/********** Ingredients dropdown menu ***********/

export function filteredIngredientsList() {
  const visibleRecipeCards = document.querySelectorAll(".recipe-card.visible");
  const ingredientsList = document.querySelector(
    ".dropdown-menus__bloc__details1 .list-items"
  );

  ingredientsList.innerHTML = ""; //reset of the ingredients list before creating a new one

  const ingredientsMap = new Map();

  visibleRecipeCards.forEach((card) => {
    const ingredientItems = card.querySelectorAll(
      ".ingredients-section__item__title"
    );

    ingredientItems.forEach((item) => {
      const ingredientName = item.textContent;
      ingredientsMap.set(ingredientName, true);
    });
  });

  const uniqueIngredients = Array.from(ingredientsMap.keys()); //Transform the keys of ingredientsMap into an array
  uniqueIngredients.sort();

  uniqueIngredients.forEach((ingredient) => {
    const li = document.createElement("li");
    li.textContent = ingredient;
    ingredientsList.appendChild(li);
  });
}

/********** Appliances dropdown menu ***********/

export function filteredAppliancesList() {
  const visibleRecipeCards = document.querySelectorAll(".recipe-card.visible");
  const appliancesList = document.querySelector(
    ".dropdown-menus__bloc__details2 .list-items"
  );

  appliancesList.innerHTML = ""; // Resetting the appliances list before creating a new one

  const appliancesMap = new Map();

  visibleRecipeCards.forEach((card) => {
    const recipeName = card.querySelector(
      ".recipe-card__details h2"
    ).textContent;

    // Looking for the corresponding recipe in the recipes table
    //find() : méthode JS utilisée pour rechercher un élément dans un tableau - elle prend en argument une fonction de rappel (callback) qui spécifie la condition de recherche
    //recipe => recipe.name === recipeName --> fonction de rappel
    //recipe représente chaque élément du tableau recipes
    //La fonction vérifie si la propriété name de l'objet recette correspond au recipeName extrait précédemment
    //matchingRecipe stocke le résultat de la recherche (objet avec toutes les propriétés): si une recette est trouvée dans le tableau recipes, elle sera assignée à matchingRecipe, sinon matchingRecipe sera assignée à undefined
    const matchingRecipe = recipes.find((recipe) => recipe.name === recipeName);
    //Le bloc de code ci-dessous s'effectue si matchingRecipe est définie
    if (matchingRecipe) {
      const appliance = matchingRecipe.appliance;
      appliancesMap.set(appliance, true);
    }
  });

  const uniqueAppliances = Array.from(appliancesMap.keys()); // Transforme les clés de appliancesMap en tableau
  uniqueAppliances.sort();

  uniqueAppliances.forEach((appliance) => {
    const li = document.createElement("li");
    li.textContent = appliance;
    appliancesList.appendChild(li);
  });
}

/********** Ustensils dropdown menu ***********/

export function filteredUstensilsList() {
  const visibleRecipeCards = document.querySelectorAll(".recipe-card.visible");
  const ustensilsList = document.querySelector(
    ".dropdown-menus__bloc__details3 .list-items"
  );

  ustensilsList.innerHTML = "";

  const ustensilsMap = new Map();

  visibleRecipeCards.forEach((card) => {
    const recipeName = card.querySelector(
      ".recipe-card__details h2"
    ).textContent;

    const matchingRecipe = recipes.find((recipe) => recipe.name === recipeName);

    if (matchingRecipe) {
      const ustensils = matchingRecipe.ustensils;
      ustensils.forEach((ustensil) => {
        ustensilsMap.set(ustensil, true);
      });
    }
  });

  const uniqueUstensils = Array.from(ustensilsMap.keys());
  uniqueUstensils.sort();

  uniqueUstensils.forEach((ustensil) => {
    const li = document.createElement("li");
    li.textContent = ustensil;
    ustensilsList.appendChild(li);
  });
}

/*********** Search field in dropdown menus ***********/

function setupFilter(searchSelector, listSelector) {
  const searchInput = document.querySelector(searchSelector);
  const list = document.querySelector(listSelector);

  searchInput.addEventListener("input", () => {
    const searchValue = searchInput.value.toLowerCase();
    const items = list.querySelectorAll("li");

    items.forEach((item) => {
      const itemText = item.textContent.toLowerCase();
      item.style.display = itemText.includes(searchValue) ? "block" : "none";
    });
  });

  const deleteButton = document.querySelector(
    `${searchSelector} + .search-box__delete`
  );
  deleteButton.addEventListener("click", (event) => {
    if (event.target.closest(".dropdown-menus__bloc__details1")) {
      searchInput.value = "";
      filteredIngredientsList();
    }
    if (event.target.closest(".dropdown-menus__bloc__details2")) {
      searchInput.value = "";
      filteredAppliancesList();
    }
    if (event.target.closest(".dropdown-menus__bloc__details3")) {
      searchInput.value = "";
      filteredUstensilsList();
    }
  });
}

setupFilter(
  ".search-box__input1",
  ".dropdown-menus__bloc__details1 .list-items"
);
setupFilter(
  ".search-box__input2",
  ".dropdown-menus__bloc__details2 .list-items"
);
setupFilter(
  ".search-box__input3",
  ".dropdown-menus__bloc__details3 .list-items"
);

/********** Filters selection **********/

document.addEventListener("DOMContentLoaded", addingFilter);

function addingFilter() {
  const filterItems = document.querySelectorAll(".list-items li");
  //ingredientItems : NodeList(119) // 0 si pas "DOMContentLoaded") -> maintenant 155 éléments
  const filterContainer = document.querySelector(".tags-container");

  filterItems.forEach((item) => {
    item.addEventListener("click", () => {
      const newFilter = document.createElement("p");
      newFilter.textContent = item.textContent;
      filterContainer.appendChild(newFilter);
      filterRecipes();
      numberOfRecipeCards();
      filteredIngredientsList();
      filteredAppliancesList();
      filteredUstensilsList();
    });
  });
}

/********** Filter recipes according to new tags added ***********/

function filterRecipes() {
  const appliedFilters = Array.from(
    document.querySelectorAll(".tags-container p")
  ).map((filter) => filter.textContent.toLowerCase());
  //Avec querySelectorAll, création d'une NodeList, donc transformation en tableau avec Array.from
  //Puis map() parcourt chaque élément du tableau, extrait le texte, le transforme en minuscule, et ajoute le nouveau texte au nouveau tableau appliedFilters

  recipeCards.forEach((card) => {
    const ingredients = Array.from(
      card.querySelectorAll(".ingredients-section__item__title")
    ).map((ingredient) => ingredient.textContent.toLowerCase());

    const recipeName = card
      .querySelector(".recipe-card__details h2")
      .textContent.toLowerCase();

    const matchingRecipe = recipes.find(
      (recipe) => recipe.name.toLowerCase() === recipeName
    );

    const hasAllFilters = appliedFilters.every((filter) => {
      return (
        ingredients.includes(filter) ||
        recipeName.includes(filter) ||
        (matchingRecipe && matchingRecipe.appliance.toLowerCase() === filter) ||
        (matchingRecipe &&
          matchingRecipe.ustensils.some((ustensil) =>
            ustensil.toLowerCase().includes(filter)
          ))
      );
    });

    //every(): check if all the elements of the array pass the test implemented by the provided function
    if (hasAllFilters) {
      card.classList.add("visible");
    } else {
      card.classList.remove("visible");
    }
  });
}

/************ Extracting data **********/

// function extractAppliancesAndUstensils(recipes) {
//   const appliancesSet = new Set();
//   const ustensilsSet = new Set();

//   recipes.forEach((recipe) => {
//     appliancesSet.add(recipe.appliance.toLowerCase());

//     recipe.ustensils.forEach((ustensil) => {
//       ustensilsSet.add(ustensil.toLowerCase());
//     });
//   });

//   return {
//     appliances: Array.from(appliancesSet),
//     ustensils: Array.from(ustensilsSet),
//   };
// }

// const { appliances, ustensils } = extractAppliancesAndUstensils(recipes);
