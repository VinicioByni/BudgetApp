import { fetchRead } from './ReadApi.js';
export var incomeTableVariant = "income";
export var expenseTableVariant = "expense";
export var loadTable = function (tableVariant) {
    fetchRead(tableVariant);
};
export var loadTables = function () {
    fetchRead(incomeTableVariant);
    fetchRead(expenseTableVariant);
};
loadTables();
//# sourceMappingURL=ReadLogic.js.map