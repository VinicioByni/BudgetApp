import { setSortOption, setSortOrder } from "../TableParameters/TableParameters.js";
import { getExpenseTable } from "./GetTableHandler.js";
export function handleSorting(btn, sortBtns) {
    var sortOption = btn.getAttribute('data-sort');
    var sortOrder = btn.getAttribute('data-order');
    if (sortOrder === "Inactive") {
        btn.setAttribute('data-order', 'Desc');
        sortOrder = 'Desc';
    }
    else if (sortOrder === "Desc") {
        btn.setAttribute('data-order', 'Asc');
        sortOrder = 'Asc';
    }
    else {
        btn.setAttribute('data-order', 'Desc');
        sortOrder = 'Desc';
    }
    setSortOption(sortOption);
    setSortOrder(sortOrder);
    getExpenseTable();
}
//# sourceMappingURL=SortingHandler.js.map