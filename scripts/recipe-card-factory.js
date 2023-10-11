import { recipes } from "../data/recipes.js";
/********* Recipes cards factory **********/
//recipesCards() creates the recipe cards

export function recipesCards() {
  const searchResultsSection = document.getElementById("search-results");

  recipes.forEach((recipe) => {
    const article = document.createElement("article");
    article.classList.add("recipe-card");
    article.classList.add("visible");

    const timeElement = document.createElement("p");
    timeElement.classList.add("recipe-card__time");
    timeElement.innerHTML = `${recipe.time} min`;

    const imageContainer = document.createElement("div");
    imageContainer.classList.add("recipe-card__img");
    const recipeImage = document.createElement("img");
    recipeImage.src = `./assets/recipes-illustations/${recipe.image}`;
    recipeImage.setAttribute('alt', `${recipe.name}`);
    imageContainer.appendChild(recipeImage);

    const detailsContainer = document.createElement("div");
    detailsContainer.classList.add("recipe-card__details");

    const recipeName = document.createElement("h2");
    recipeName.innerHTML = recipe.name;

    const processDiv = document.createElement("div");
    processDiv.classList.add("recipe-card__details__process");
    const processHeading = document.createElement("h3");
    processHeading.textContent = "Recette";
    const processDescription = document.createElement("p");
    processDescription.innerHTML = recipe.description;

    const ingredientsDiv = document.createElement("div");
    ingredientsDiv.classList.add("recipe-card__details__ingredients");
    const ingredientsHeading = document.createElement("h3");
    ingredientsHeading.textContent = "Ingrédients";
    const ingredientsSection = document.createElement("div");
    ingredientsSection.classList.add("ingredients-section");

    // Ingredients loop (max 6)
    for (let i = 0; i < 6; i++) {
      const ingredient = recipe.ingredients[i];
      const ingredientItemDiv = document.createElement("div");
      ingredientItemDiv.classList.add("ingredients-section__item");

      if (ingredient) {
        const ingredientTitle = document.createElement("p");
        ingredientTitle.classList.add("ingredients-section__item__title");
        ingredientTitle.innerHTML = ingredient.ingredient;

        const ingredientQuantityBox = document.createElement("p");
        ingredientQuantityBox.classList.add(
          "ingredients-section__item__quantity"
        );
        const ingredientQuantity = ingredient.quantity
          ? ingredient.quantity
          : "-";

        const ingredientUnit = ingredient.unit ? ingredient.unit : " ";
        ingredientQuantityBox.innerHTML = `${ingredientQuantity} ${ingredientUnit}`;

        ingredientItemDiv.appendChild(ingredientTitle);
        ingredientItemDiv.appendChild(ingredientQuantityBox);
      }

      ingredientsSection.appendChild(ingredientItemDiv);
    }

    processDiv.appendChild(processHeading);
    processDiv.appendChild(processDescription);

    ingredientsDiv.appendChild(ingredientsHeading);
    ingredientsDiv.appendChild(ingredientsSection);

    detailsContainer.appendChild(recipeName);
    detailsContainer.appendChild(processDiv);
    detailsContainer.appendChild(ingredientsDiv);

    article.appendChild(timeElement);
    article.appendChild(imageContainer);
    article.appendChild(detailsContainer);

    searchResultsSection.appendChild(article);
  });
}

recipesCards();
