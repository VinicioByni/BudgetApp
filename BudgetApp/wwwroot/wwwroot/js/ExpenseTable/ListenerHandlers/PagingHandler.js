import { setPageNumber } from "../TableParameters/TableParameters.js";
import { getExpenseTable } from "./GetTableHandler.js";
export function handlePaging(btn) {
    var pageNumber = parseInt(btn.getAttribute('data-number'));
    setPageNumber(pageNumber);
    getExpenseTable();
}
//# sourceMappingURL=PagingHandler.js.map