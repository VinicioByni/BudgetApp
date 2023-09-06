var financialState = {
    budget: 0,
    totalExpenses: 0,
    totalIncomes: 0
};
export var FinancialState = {
    getState: function () { return financialState; },
    updateBudget: function (newBudget) {
        financialState.budget = newBudget;
    },
    updateTotalExpenses: function (newTotalExpenses) {
        financialState.totalExpenses = newTotalExpenses;
    },
    updateTotalIncomes: function (newTotalIncomes) {
        financialState.totalIncomes = newTotalIncomes;
    }
};
//# sourceMappingURL=FinancialState.js.map