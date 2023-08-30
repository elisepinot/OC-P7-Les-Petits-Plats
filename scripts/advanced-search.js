/********** Open/Close dropdown menus **********/
// export function initializeDropdown() {
//   const dropdownButton = document.querySelector(".dropdown-button");
//   const dropdownIcon = document.querySelector(".dropdown-icon");
//   const dropdownMenu = document.querySelector(".dropdown-menus__bloc__details");
//   const dropdownMenuBloc = document.querySelector(".dropdown-menus__bloc");

//   let isMenuOpen = false;

//   dropdownButton.addEventListener("click", () => {
//     isMenuOpen = !isMenuOpen;
//     dropdownMenu.style.display = isMenuOpen ? "block" : "none";
//     dropdownMenuBloc.classList.toggle("visible");
//     dropdownMenuBloc.classList.toggle("open");
//   });
// }
a;
export function initializeDropdown(button, blocDetails, menuBloc) {
  const dropdownMenuBloc = document.querySelector(`.${menuBloc}`);
  const dropdownButton = document.querySelector(`.${button}`);
  const dropdownMenuDetails = document.querySelector(`.${blocDetails}`);

  // const dropdownIcon = document.querySelector(".dropdown-icon");

  let isMenuOpen = false;

  dropdownButton.addEventListener("click", () => {
    isMenuOpen = !isMenuOpen;
    dropdownMenuDetails.style.display = isMenuOpen ? "block" : "none";
    dropdownMenuBloc.classList.toggle("visible");
    dropdownMenuBloc.classList.toggle("open");
  });
}
