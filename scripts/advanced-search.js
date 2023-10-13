import { recipes } from "../data/recipes.js";
import { recipeCards } from "./script.js";
import { numberOfRecipeCards } from "./recipes-counter.js";
// import { visibleCards } from "./main-research-algo1.js";

/********** Open/Close dropdown menus when clicking on the open/close button **********/
//initializeDropdown() sets up event listeners for opening/closing dropdown menus
export function initializeDropdown(button, blocDetails, menuBloc) {
  const dropdownMenuBloc = document.querySelector(`.${menuBloc}`);
  const dropdownButton = document.querySelector(`.${button}`);
  const dropdownMenuDetails = document.querySelector(`.${blocDetails}`);
  let isMenuOpen = false;

  dropdownButton.addEventListener("click", () => {
    isMenuOpen = !isMenuOpen;
    dropdownMenuDetails.style.display = isMenuOpen ? "block" : "none";
    // dropdownMenuBloc.classList.toggle("visible");
    dropdownMenuBloc.classList.toggle("open");
  });
}

//openCloseDropdownMenus() calls initializeDropdown() for the 3 dropdown menus
export function openCloseDropdownMenus() {
  for (let i = 1; i <= 3; i++) {
    const buttonId = `dropdown-button${i}`;
    const detailsClass = `dropdown-menus__bloc__details${i}`;
    const blocClass = `dropdown-menus__bloc${i}`;

    initializeDropdown(buttonId, detailsClass, blocClass);
  }
}

/********** Ingredients dropdown menu ***********/
//filteredIngredientsList(), filteredAppliancesList(), and filteredUstensilsList() handle the update  of the <li> elements in the dropdown menus, according to recipe cards which are visible.
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

    //Looking for the corresponding recipe in the recipes table
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
//searchFieldsDropwdown() sets the search fields in the dropdown menus
function searchFieldsDropwdown(searchSelector, listSelector) {
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

searchFieldsDropwdown(
  ".search-box__input1",
  ".dropdown-menus__bloc__details1 .list-items"
);
searchFieldsDropwdown(
  ".search-box__input2",
  ".dropdown-menus__bloc__details2 .list-items"
);
searchFieldsDropwdown(
  ".search-box__input3",
  ".dropdown-menus__bloc__details3 .list-items"
);

/*********** currentFilters **********/
//currentFilters stores the filters: searchText & tags
export let currentFilters = {
  searchText: "",
  tags: [],
};

/*********** Adding filters when selecting an item in the dropdown menus **********/

document.addEventListener("DOMContentLoaded", addingFilter);

function addingFilter() {
  const dropdownMenus = document.querySelectorAll(
    ".dropdown-menus__bloc__details .list-items"
  );

  //Event listener when clicking on a item in the dropdown menus
  dropdownMenus.forEach((menu) => {
    menu.addEventListener("click", (event) => {
      if (event.target && event.target.nodeName === "LI") {
        const item = event.target;
        const itemName = item.textContent;

        const filterContainer = document.querySelector(".tags-container");
        const filterIndex = currentFilters.tags.indexOf(itemName);

        //If/else to check if the filter already exists: if not, it is added to the currentFilters object and a tag is created in the DOM
        if (filterIndex === -1) {
          const newTag = document.createElement("div");
          newTag.classList.add("filter-tag");
          filterContainer.appendChild(newTag);

          const tagContent = document.createElement("p");
          tagContent.textContent = itemName;
          newTag.appendChild(tagContent);

          const deleteTagButton = document.createElement("button");
          const deleteTagIcon = document.createElement("img");
          deleteTagIcon.src = "./assets/icons/advanced-search-delete-tag.svg";
          deleteTagButton.appendChild(deleteTagIcon);
          newTag.appendChild(deleteTagButton);

          currentFilters.tags.push(itemName);

          //When a tag is created, it can be removed from the DOM and from the currentFilters object when clicking on the delete button
          deleteTagButton.addEventListener("click", () => {
            const tagIndex = currentFilters.tags.indexOf(
              tagContent.textContent
            );
            if (tagIndex > -1) {
              currentFilters.tags.splice(tagIndex, 1);
            }
            newTag.remove();
            unifiedFilter();
          });
        } else {
          //If the filter already exists, it is removed from the currentFilters object and from the DOM (visual tag)
          currentFilters.tags.splice(filterIndex, 1);

          const filterTags = document.querySelectorAll(".filter-tag p");
          filterTags.forEach((tag) => {
            if (tag.textContent === itemName) {
              tag.parentNode.remove();
            }
          });
        }

        unifiedFilter();
      }
    });
  });
}

/********** Global search function ***********/
//unifiedFilter() applies the currentFilters to the recipeCards to display only the cards which match the filters
export function unifiedFilter() {
  recipeCards.forEach((card) => {
    const isTextMatch = checkTextMatch(card, currentFilters.searchText);
    const isTagMatch = checkTagMatch(card, currentFilters.tags);

    if (isTextMatch && isTagMatch) {
      card.classList.add("visible");
    } else {
      card.classList.remove("visible");
    }
  });

  numberOfRecipeCards();
  filteredIngredientsList();
  filteredAppliancesList();
  filteredUstensilsList();
}

/*********** Main search field ***********/
function checkTextMatch(card, searchText) {
  // If searchText is empty or less than 3 characters, we don't apply any filter --> return true so that the card is displayed
  if (!searchText || searchText.length < 3) {
    return true;
  }
  const title = card
    .querySelector(".recipe-card__details h2")
    .textContent.toLowerCase();

  const ingredients = Array.from(
    card.querySelectorAll(".ingredients-section__item__title")
  )
    .map((ingredient) => ingredient.textContent.toLowerCase())
    .join(" ");

  const description = card
    .querySelector(".recipe-card__details__process p")
    .textContent.toLowerCase();

  return (
    title.includes(searchText) ||
    ingredients.includes(searchText) ||
    description.includes(searchText)
  );
}

function checkTagMatch(card, tags) {
  // If no tag is defined, we don't apply any filter --> return true so that the card is displayed

  if (tags.length === 0) {
    return true;
  }

  const ingredients = Array.from(
    card.querySelectorAll(".ingredients-section__item__title")
  ).map((ingredient) => ingredient.textContent.toLowerCase());

  const recipeName = card
    .querySelector(".recipe-card__details h2")
    .textContent.toLowerCase();

  // Comparison of the name of each recipe in the recipes array with recipeName. If there is a match, the recipe object corresponding is assigned to matchingRecipe.
  const matchingRecipe = recipes.find(
    (recipe) => recipe.name.toLowerCase() === recipeName
  );

  //Defines 'appliance' and 'ustensils' variables based on the matchingRecipe: if matchingRecipe is not null, we take its appliance and ustensils properties.
  const appliance = matchingRecipe
    ? matchingRecipe.appliance.toLowerCase()
    : "";

  const ustensils = matchingRecipe
    ? matchingRecipe.ustensils.map((ust) => ust.toLowerCase())
    : [];

  // Vérification si tous les tags sont présents dans les ingrédients, le nom de la recette, l'appareil ou les ustensiles.
  return tags.every((tag) => {
    tag = tag.toLowerCase();
    return (
      ingredients.includes(tag) ||
      recipeName.includes(tag) ||
      appliance === tag ||
      ustensils.some((ustensil) => ustensil.includes(tag))
    );
  });
}

// function updateFilters(newFilter, action) {
//   if (action === "add") {
//     currentFilters.tags.push(newFilter);
//   } else if (action === "remove") {
//     const index = currentFilters.tags.indexOf(newFilter);
//     if (index > -1) {
//       currentFilters.tags.splice(index, 1);
//       //splice(): index where to start removing elements, number of elements to remove
//     }
//   }
//   unifiedFilter();
// }

//removeFilter() handles filters removal
// function removeFilter(filterElement) {
//   filterElement.addEventListener("click", () => {
//     const filterText = filterElement.textContent;
//     filterElement.remove(); //remove() deletes the element from the DOM
//     updateFilters(filterText, "remove");
//     numberOfRecipeCards();
//     filteredIngredientsList();
//     filteredAppliancesList();
//     filteredUstensilsList();
//   });
// }
