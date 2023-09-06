export var defaultSearchString = "";
export var defaultSearchDateString = "";
export var defaultSelectedHeader = "Date";
export var defaultSortOrder = "Descending";
export var defaultPageSize = 2;
export var defaultPageNumber = 1;
var filteringParameters = {
    searchString: defaultSearchString,
    searchDateString: defaultSearchDateString
};
var sortingParameters = {
    selectedHeader: defaultSelectedHeader,
    order: defaultSortOrder,
    sortOrder: defaultSelectedHeader + defaultSortOrder
};
var pagingParameters = {
    pageSize: defaultPageSize,
    pageNumber: defaultPageNumber
};
export var defaultTableSettingsParameters = {
    filteringParameters: filteringParameters,
    sortingParameters: sortingParameters,
    pagingParameters: pagingParameters
};
//# sourceMappingURL=TableSettingsParameters.js.map