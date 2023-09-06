import { defaultTableSettingsParameters } from './TableSettingsParameters.js';
import { areTableSettingsParametersSet, setTableSettingsParameters } from './TableSettingsParametersLocalStorage.js';
import { fetchRead } from './CRUD/ReadApi.js';
export var incomeTableVariant = "income";
export var expenseTableVariant = "expense";
export var loadTable = function (tableVariant) {
    if (!areTableSettingsParametersSet(tableVariant)) {
        setTableSettingsParameters(tableVariant, defaultTableSettingsParameters);
    }
    fetchRead(tableVariant);
};
export var loadTables = function () {
    fetchRead(incomeTableVariant);
    fetchRead(expenseTableVariant);
};
loadTables();
//# sourceMappingURL=TablesViewLoader.js.map