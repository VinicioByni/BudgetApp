import { setDataActiveTrue } from "../../Utils/SetAttributeFunctions.js";
import { enableClearBtnState } from "../ListenerHandlers/ClearTableParametersHandler.js";
export var tableParameters = {};
export function initializeTableParameters() {
    tableParameters = {
        periodInitialDate: '',
        searchString: '',
        searchDate: '',
        sortOrder: '',
        sortOption: '',
        pageNumber: 1,
        pageSize: 5
    };
}
export function getTableParameters() {
    return tableParameters;
}
export function getUrlTableParameters() {
    var urlTableParameters = "pageNumber=".concat(tableParameters.pageNumber);
    urlTableParameters += "&pageSize=".concat(tableParameters.pageSize);
    urlTableParameters += "&periodInitialDate=".concat(tableParameters.periodInitialDate);
    urlTableParameters += "&searchDate=".concat(tableParameters.searchDate);
    urlTableParameters += "&searchString=".concat(tableParameters.searchString);
    urlTableParameters += "&sortOption=".concat(tableParameters.sortOption);
    urlTableParameters += "&sortOrder=".concat(tableParameters.sortOrder);
    return urlTableParameters;
}
export function updateTableParametersState() {
    if (tableParameters.searchString !== '') {
        updateSearchStringState();
        enableClearBtnState();
    }
    if (tableParameters.searchDate !== '') {
        updateSearchDateState();
        enableClearBtnState();
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
export function setPageNumber(pageNumber) {
    tableParameters.pageNumber = pageNumber;
}
export function setSortOption(sortOption) {
    tableParameters.sortOption = sortOption;
}
export function setSortOrder(sortOrder) {
    tableParameters.sortOrder = sortOrder;
}
//# sourceMappingURL=TableParameters.js.map