var defaultExpenseFilterParameters = {
    expenseSortOrder: "",
    expenseSearchString: "",
    expensePageSize: 2,
    expensePageNumber: 0
};
var expenseFilterParameters = {
    expenseSortOrder: "",
    expenseSearchString: "",
    expensePageSize: 2,
    expensePageNumber: 0
};
var expenseFilterParametersString = function (expenseFilterParameters) {
    return "sortExpenseOrder=".concat(expenseFilterParameters.expenseSortOrder, "&searchExpenseString=").concat(expenseFilterParameters.expenseSearchString, "&pageSize=").concat(expenseFilterParameters.expensePageSize, "&pageNumber=").concat(expenseFilterParameters.expensePageNumber);
};
var filterParametersToDefault = function () {
    expenseFilterParameters.expenseSortOrder = defaultExpenseFilterParameters.expenseSortOrder,
        expenseFilterParameters.expenseSearchString = defaultExpenseFilterParameters.expenseSearchString,
        expenseFilterParameters.expensePageSize = defaultExpenseFilterParameters.expensePageSize,
        expenseFilterParameters.expensePageNumber = defaultExpenseFilterParameters.expensePageNumber;
};
// Search
var expenseSearchBtn = document.querySelector('#expenseSearchBtn');
var expenseSearchInput = document.querySelector('#expenseSearchInput');
expenseSearchBtn.addEventListener('click', function () { return expenseSearchFilter(); });
var expenseSearchFilter = function () {
    expenseFilterParameters.expenseSearchString = expenseSearchInput.value;
    var parameters = expenseFilterParametersString(expenseFilterParameters);
    getExpensesPartial(parameters);
};
// Page Size
/* TEST That expense page size is a number when calling getExpensesPartial */
var expensePageSizeBtn = document.querySelector('#expensePageSizeBtn');
var expensePageSizeInput = document.querySelector('#expensePageSizeInput');
expensePageSizeBtn.addEventListener('click', function () { return expensePageSizeFilter(); });
var expensePageSizeFilter = function () {
    expenseFilterParameters.expensePageSize = parseInt(expensePageSizeInput.value);
    var parameters = expenseFilterParametersString(expenseFilterParameters);
    getExpensesPartial(parameters);
};
// Clear Filters
var expenseClearFiltersBtn = document.querySelector('#expenseClearBtn');
expenseClearFiltersBtn.addEventListener('click', function () { return expenseClearFilters(); });
var expenseClearFilters = function () {
    expenseSearchInput.value = defaultExpenseFilterParameters.expenseSearchString;
    expensePageSizeInput.value = "".concat(defaultExpenseFilterParameters.expensePageSize);
    filterParametersToDefault();
    getExpensesPartial(DEFAULT_EXPENSE_FILTER_PARAMETERS_STRING);
};
//# sourceMappingURL=FilterParameters.js.map