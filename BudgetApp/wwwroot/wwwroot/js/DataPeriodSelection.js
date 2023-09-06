import { isPeriodInitialDateSet, setPeriodInitialDate } from "./DataPeriodSelectionLocalStorage.js";
import { incomeTableVariant, expenseTableVariant, loadTables } from "./Table/CRUD/ReadLogic.js";
import { getTableSettingsParameters, setTableSettingsParameters } from "./Table/TableSettingsParameters/TableSettingsParametersLocalStorage.js";
import { updateTilesTimePeriod, updateAllTileAmounts } from "./Tiles/Tiles.js";
import { defaultTableSettingsParameters } from './Table/TableSettingsParameters/TableSettingsParameters.js';
// Api takes empty string as the first day of the current Month
export var defaultPeriodInitialDate = "";
if (isPeriodInitialDateSet) {
    setPeriodInitialDate(defaultPeriodInitialDate);
}
var datePeriodSelect = document.querySelector('.time-period-select');
datePeriodSelect.addEventListener('change', function () {
    if (datePeriodSelect instanceof HTMLSelectElement) {
        var periodInitialDate = datePeriodSelect.value;
        var datePeriodSelectedText = datePeriodSelect.options[datePeriodSelect.selectedIndex].textContent;
        setPeriodInitialDate(periodInitialDate);
        resetTablesPageNumber();
        loadTables();
        updateAllTileAmounts();
        updateTilesTimePeriod(datePeriodSelectedText);
    }
});
function resetTablesPageNumber() {
    var incomeSettingsParameters = getTableSettingsParameters(incomeTableVariant);
    var expenseSettingsParameters = getTableSettingsParameters(expenseTableVariant);
    incomeSettingsParameters.pagingParameters.pageNumber = defaultTableSettingsParameters.pagingParameters.pageNumber;
    expenseSettingsParameters.pagingParameters.pageNumber = defaultTableSettingsParameters.pagingParameters.pageNumber;
    setTableSettingsParameters(incomeTableVariant, incomeSettingsParameters);
    setTableSettingsParameters(expenseTableVariant, expenseSettingsParameters);
}
//# sourceMappingURL=DataPeriodSelection.js.map