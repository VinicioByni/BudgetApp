import { getTableSettingsParameters, setTableSettingsParameters } from '../TableSettingsParameters/TableSettingsParametersLocalStorage.js';
import { loadTable } from '../CRUD/ReadLogic.js';
export var sortTable = function (tableVariant) {
    // Sort
    var tableSettingsParameters = getTableSettingsParameters(tableVariant);
    var headers = document.querySelectorAll("#".concat(tableVariant, "Table th"));
    headers.forEach(function (header) {
        header.addEventListener('click', function () {
            var header = this.dataset.cell;
            var selectedHeader = tableSettingsParameters.sortingParameters.selectedHeader;
            var order = tableSettingsParameters.sortingParameters.order;
            if (header !== selectedHeader) {
                tableSettingsParameters.sortingParameters.order = "Descending";
            }
            else if (order === "Descending") {
                tableSettingsParameters.sortingParameters.order = "Ascending";
            }
            else {
                tableSettingsParameters.sortingParameters.order = "Descending";
            }
            tableSettingsParameters.sortingParameters.selectedHeader = header;
            tableSettingsParameters.sortingParameters.sortOrder = header + tableSettingsParameters.sortingParameters.order;
            setTableSettingsParameters(tableVariant, tableSettingsParameters);
            loadTable(tableVariant);
        });
    });
};
//# sourceMappingURL=SortingFunctions.js.map