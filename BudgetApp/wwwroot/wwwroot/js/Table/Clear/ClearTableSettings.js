import { loadTable } from '../TablesViewLoader.js';
import { defaultSearchString, defaultSearchDateString } from '../TableSettingsParameters.js';
import { getTableSettingsParameters, setTableSettingsParameters } from '../TableSettingsParametersLocalStorage.js';
export var clearTableFilterSettings = function (tableVariant) {
    var clearFiltersBtn = document.querySelector("#".concat(tableVariant, "ClearBtn"));
    var searchInput = document.querySelector("#".concat(tableVariant, "SearchInput"));
    var searchDateInput = document.querySelector("#".concat(tableVariant, "SearchInput"));
    var clearedTableFilterParameters = getTableSettingsParameters(tableVariant);
    clearedTableFilterParameters.filteringParameters.searchString = defaultSearchString;
    clearedTableFilterParameters.filteringParameters.searchString = defaultSearchDateString;
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
//# sourceMappingURL=ClearTableSettings.js.map