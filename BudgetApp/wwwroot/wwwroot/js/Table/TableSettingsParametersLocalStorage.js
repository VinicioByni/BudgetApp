export var areTableSettingsParametersSet = function (tableVariant) {
    var tableSettingsParametersString = localStorage.getItem("".concat(tableVariant, "TableSettingsParameters"));
    if (tableSettingsParametersString === null) {
        return false;
    }
    var tableSettingsParameters = JSON.parse(tableSettingsParametersString || '{}');
    var pageNumber = tableSettingsParameters.pagingParameters.pageNumber;
    if (isValidNumber(pageNumber)) {
        return true;
    }
    else {
        localStorage.setItem("".concat(tableVariant, "TableSettingsParameters"), null);
        return false;
    }
};
function isValidNumber(number) {
    if (number < 1) {
        return false;
    }
    return true;
}
export var setTableSettingsParameters = function (tableVariant, tableSettingsParameters) {
    var tableSettingsParametersString = JSON.stringify(tableSettingsParameters);
    localStorage.setItem("".concat(tableVariant, "TableSettingsParameters"), tableSettingsParametersString);
};
export var getTableSettingsParameters = function (tableVariant) {
    var tableSettingsParametersString = localStorage.getItem("".concat(tableVariant, "TableSettingsParameters"));
    var tableSettingsParameters = JSON.parse(tableSettingsParametersString || '{}');
    return tableSettingsParameters;
};
//# sourceMappingURL=TableSettingsParametersLocalStorage.js.map