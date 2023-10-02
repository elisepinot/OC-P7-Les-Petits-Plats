export function numberOfRecipeCards() {
  const totalRecipes = document.querySelector(
    ".advanced-search__total-recipes"
  );
  const visibleRecipeCards = document.querySelectorAll(".recipe-card.visible");

  const numberOfVisibleRecipeCards = visibleRecipeCards.length;

  const noResultMessage = document.querySelector(".no-result-message");

  if (numberOfVisibleRecipeCards === 0) {
    displayMessage();
    totalRecipes.innerHTML = `${numberOfVisibleRecipeCards} recette`;
  } else if (numberOfVisibleRecipeCards === 1) {
    totalRecipes.innerHTML = `0${numberOfVisibleRecipeCards} recette`;
    noResultMessage.style.display = "none";
  } else if (
    numberOfVisibleRecipeCards < 10 &&
    numberOfVisibleRecipeCards > 0
  ) {
    totalRecipes.innerHTML = `0${numberOfVisibleRecipeCards} recettes`;
    noResultMessage.style.display = "none";
  } else {
    totalRecipes.innerHTML = `${numberOfVisibleRecipeCards} recettes`;
    noResultMessage.style.display = "none";
  }
}

/********** No result message **********/

function displayMessage() {
  const noResultMessage = document.querySelector(".no-result-message");
  const searchInput = document.querySelector(".main-search__input").value;
  noResultMessage.innerHTML = `Aucune recette ne contient "${searchInput}", vous pouvez chercher «
    tarte aux pommes », « poisson », etc.`;
  noResultMessage.style.display = "block";
}
