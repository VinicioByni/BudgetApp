import { loadTable } from '../CRUD/ReadLogic.js';
import { defaultSearchString, defaultSearchDateString } from '../TableSettingsParameters/TableSettingsParameters.js';
import { getTableSettingsParameters, setTableSettingsParameters } from '../TableSettingsParameters/TableSettingsParametersLocalStorage.js';
export var clearTableFilterSettings = function (tableVariant) {
    var clearFiltersBtn = document.querySelector("#".concat(tableVariant, "ClearBtn"));
    var searchInput = document.querySelector("#".concat(tableVariant, "SearchInput"));
    var searchDateInput = document.querySelector("#".concat(tableVariant, "SearchDateInput"));
    var clearedTableFilterParameters = getTableSettingsParameters(tableVariant);
    clearedTableFilterParameters.filteringParameters.searchString = defaultSearchString;
    clearedTableFilterParameters.filteringParameters.searchDateString = defaultSearchDateString;
    clearFiltersBtn.addEventListener('click', function () {
        setTableSettingsParameters(tableVariant, clearedTableFilterParameters);
        var tableSettingsParameters = getTableSettingsParameters(tableVariant);
        if (searchInput instanceof HTMLInputElement) {
            searchInput.value = tableSettingsParameters.filteringParameters.searchString;
        }
        if (searchDateInput instanceof HTMLInputElement) {
            searchDateInput.value = tableSettingsParameters.filteringParameters.searchDateString;
        }
        loadTable(tableVariant);
    });
};
//# sourceMappingURL=ClearTableFilterSettings.js.map