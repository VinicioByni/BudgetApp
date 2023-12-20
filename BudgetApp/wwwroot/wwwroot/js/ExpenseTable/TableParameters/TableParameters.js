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
//# sourceMappingURL=TableParameters.js.map