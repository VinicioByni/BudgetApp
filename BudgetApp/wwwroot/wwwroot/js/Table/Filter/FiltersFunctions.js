import { getTableSettingsParameters, setTableSettingsParameters } from '../TableSettingsParameters/TableSettingsParametersLocalStorage.js';
import { safeToString } from '../../Utilities/StringUtilities.js';
import { loadTable } from '../CRUD/ReadLogic.js';
import { defaultSearchString } from '../TableSettingsParameters/TableSettingsParameters.js';
var activeInputBorderColor = "#1c7fce";
export var filterTable = function (tableVariant) {
    var tableSettingsParameters = getTableSettingsParameters(tableVariant);
    var searchInput = document.querySelector("#".concat(tableVariant, "SearchInput"));
    if (searchInput instanceof HTMLInputElement) {
        searchInput.value = tableSettingsParameters.filteringParameters.searchString;
        if (searchInput.value !== defaultSearchString) {
            searchInput.style.borderColor = activeInputBorderColor;
        }
    }
    var searchDateInput = document.querySelector("#".concat(tableVariant, "SearchDateInput"));
    if (searchDateInput instanceof HTMLInputElement) {
        searchDateInput.value = tableSettingsParameters.filteringParameters.searchDateString;
        if (searchDateInput.value !== defaultSearchString) {
            searchDateInput.style.borderColor = activeInputBorderColor;
        }
    }
    // Search
    var searchForm = document.querySelector("#".concat(tableVariant, "SearchForm"));
    searchForm.addEventListener('submit', function (event) {
        event.preventDefault();
        if (event.target instanceof HTMLFormElement) {
            var formData = new FormData(event.target);
            var searchValue = safeToString(formData.get('search'), "");
            var searchDateValue = safeToString(formData.get('searchDate'), "");
            tableSettingsParameters.filteringParameters.searchString = searchValue;
            tableSettingsParameters.filteringParameters.searchDateString = searchDateValue;
            setTableSettingsParameters(tableVariant, tableSettingsParameters);
            loadTable(tableVariant);
        }
        else {
            Error('Filter table input error');
        }
    });
};
//# sourceMappingURL=FiltersFunctions.js.map