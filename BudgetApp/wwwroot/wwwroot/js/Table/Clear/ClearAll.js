import { loadTable } from '../TablesViewLoader.js';
import { defaultTableSettingsParameters } from '../TableSettingsParameters.js';
import { getTableSettingsParameters, setTableSettingsParameters } from '../TableSettingsParametersLocalStorage.js';
export var clearAll = function (tableVariant) {
    var clearFiltersBtn = document.querySelector("#".concat(tableVariant, "ClearBtn"));
    var searchInput = document.querySelector("#".concat(tableVariant, "SearchInput"));
    var pageSizeInput = document.querySelector("#".concat(tableVariant, "PageSizeInput"));
    clearFiltersBtn.addEventListener('click', function () {
        setTableSettingsParameters(tableVariant, defaultTableSettingsParameters);
        var tableSettingsParameters = getTableSettingsParameters(tableVariant);
        if (searchInput instanceof HTMLInputElement) {
            searchInput.value = tableSettingsParameters.filteringParameters.searchString;
        }
        if (pageSizeInput instanceof HTMLInputElement) {
            pageSizeInput.value = tableSettingsParameters.pagingParameters.pageSize.toString();
        }
        loadTable(tableVariant);
    });
};
//# sourceMappingURL=ClearAll.js.map