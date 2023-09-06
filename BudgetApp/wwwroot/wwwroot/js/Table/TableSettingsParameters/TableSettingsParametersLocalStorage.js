import { isLocalStorageAvailable } from '../../Utilities/LocalStorageUtilities.js';
var fallBackStorage = {};
export var areTableSettingsParametersSet = function (tableVariant) {
    var tableSettingsParametersString;
    if (isLocalStorageAvailable) {
        tableSettingsParametersString = localStorage.getItem("".concat(tableVariant, "TableSettingsParameters"));
    }
    else {
        tableSettingsParametersString = fallBackStorage["".concat(tableVariant, "TableSettingsParameters")];
    }
    if (tableSettingsParametersString === null || tableSettingsParametersString === undefined) {
        return false;
    }
    var tableSettingsParameters = JSON.parse(tableSettingsParametersString || '{}');
    var pageNumber = tableSettingsParameters.pagingParameters.pageNumber;
    if (isValidPageNumber(pageNumber)) {
        return true;
    }
    else if (isLocalStorageAvailable) {
        localStorage.setItem("".concat(tableVariant, "TableSettingsParameters"), null);
        return false;
    }
    else {
        fallBackStorage["".concat(tableVariant, "TableSettingsParameters")] = null;
        return false;
    }
};
function isValidPageNumber(number) {
    if (number < 1) {
        return false;
    }
    return true;
}
export var setTableSettingsParameters = function (tableVariant, tableSettingsParameters) {
    var tableSettingsParametersString = JSON.stringify(tableSettingsParameters);
    if (isLocalStorageAvailable()) {
        localStorage.setItem("".concat(tableVariant, "TableSettingsParameters"), tableSettingsParametersString);
    }
    else {
        fallBackStorage["".concat(tableVariant, "TableSettingsParameters")] = tableSettingsParametersString;
    }
};
export var getTableSettingsParameters = function (tableVariant) {
    if (isLocalStorageAvailable()) {
        var tableSettingsParametersString = localStorage.getItem("".concat(tableVariant, "TableSettingsParameters"));
        var tableSettingsParameters = JSON.parse(tableSettingsParametersString || '{}');
        return tableSettingsParameters;
    }
    else {
        var tableSettingsParametersString = fallBackStorage["".concat(tableVariant, "TableSettingsParameters")];
        var tableSettingsParameters = JSON.parse(tableSettingsParametersString || '{}');
        return tableSettingsParameters;
    }
};
//# sourceMappingURL=TableSettingsParametersLocalStorage.js.map