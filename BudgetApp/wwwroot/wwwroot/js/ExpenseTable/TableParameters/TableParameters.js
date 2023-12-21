import { setDataActiveTrue } from "../../Utils/SetAttributeFunctions.js";
export var tableParameters = {};
export function initializeTableParameters() {
    tableParameters = {
        periodInitialDate: '',
        searchString: '',
        searchDate: '',
        sort: '',
        pageNumber: 1,
        pageSize: 0
    };
}
export function getTableParameters() {
    return tableParameters;
}
export function updateTableParametersState() {
    if (tableParameters.searchString !== '') {
        updateSearchStringState();
    }
    if (tableParameters.searchDate !== '') {
        updateSearchDateState();
    }
}
function updateSearchStringState() {
    var expenseSearchInput = document.querySelector('#expense-search-input');
    if (expenseSearchInput == null || !(expenseSearchInput instanceof HTMLInputElement))
        return;
    expenseSearchInput.value = tableParameters.searchString;
    setDataActiveTrue(expenseSearchInput);
}
function updateSearchDateState() {
    var expenseSearchDateInput = document.querySelector('#expense-search-date-input');
    if (expenseSearchDateInput == null || !(expenseSearchDateInput instanceof HTMLInputElement))
        return;
    expenseSearchDateInput.value = tableParameters.searchDate;
    setDataActiveTrue(expenseSearchDateInput);
}
//# sourceMappingURL=TableParameters.js.map