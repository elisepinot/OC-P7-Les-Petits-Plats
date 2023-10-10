import { searchInput } from "./script.js";
import { unifiedFilter } from "./advanced-search.js";
import { currentFilters } from "./advanced-search.js";

/********** Delete user input ***********/
const crossToDelete = document.querySelector(".main-search__delete");
crossToDelete.addEventListener("click", deleteInput);

export function deleteInput() {
  searchInput.value = "";
  currentFilters.searchText = "";
  unifiedFilter();
}
